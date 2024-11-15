import { createLogger, format, transports } from "winston";
import "reflect-metadata";
import { injectable } from "inversify";
import path from "path";

export interface ILogger {
    info(message: string, meta?: any): void;
    warn(message: string, meta?: any): void;
    error(message: string, meta?: any): void;
    debug(message: string, meta?: any): void;
}

const LOG_DIR = path.resolve(process.cwd(), "logs");


@injectable()
export class WinstonLogger implements ILogger {
    private logger = createLogger({
        level: "info",
        format: format.combine(
            format.timestamp(),
            format.errors({ stack: true }),
            format.splat(),
            format.json()
        ),
        defaultMeta: { service: "bookbuddy-service" },
        transports: [
            new transports.Console({ format: format.combine(format.colorize(), format.simple()) }),
            new transports.File({ filename: path.resolve(LOG_DIR, 'error.log'), level: "error", maxFiles: 3, maxsize: 10_000_000 }),
            new transports.File({ filename: path.resolve(LOG_DIR, 'combined.log'), maxFiles: 1, maxsize: 10_000_000 }),
        ],
    });

    constructor() {
        if (process.env.NODE_ENV !== "production") {
            this.logger.add(new transports.Console({
                format: format.combine(
                    format.colorize(),
                    format.simple()
                )
            }));
        }
    }



    info(message: string, meta?: any): void {
        this.logger.info(message, meta);
    }

    warn(message: string, meta?: any): void {
        this.logger.warn(message, meta);
    }

    error(message: string, meta?: any): void {
        this.logger.error(message, meta);
    }

    debug(message: string, meta?: any): void {
        this.logger.debug(message, meta);
    }
}