import { createLogger, format, transports } from "winston";
import "reflect-metadata";
import { injectable } from "inversify";

export interface ILogger {
    info(message: string, meta?: any): void;
    warn(message: string, meta?: any): void;
    error(message: string, meta?: any): void;
    debug(message: string, meta?: any): void;
}


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
            new transports.File({ filename: "logs/error.log", level: "error" }),
            new transports.File({ filename: "logs/combined.log" }),
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