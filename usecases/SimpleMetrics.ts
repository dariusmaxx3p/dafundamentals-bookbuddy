import { TYPES } from "../types";
import { inject, injectable } from "inversify";
import type { ILogger } from "./Logging";
import "reflect-metadata";

export interface IMetrics {
    startTimer(operation: string): () => void;
}

@injectable()
export class SimpleMetrics implements IMetrics {
    constructor(
        @inject(TYPES.LOGGER) private logger: ILogger
    ) { }

    startTimer(operation: string): () => void {
        const start = process.hrtime();

        return () => {
            const diff = process.hrtime(start);
            const durationInMs = diff[0] * 1000 + diff[1] / 1e6;
            this.logger.info(`Operation "${operation}" took ${durationInMs.toFixed(3)} ms.`);
        };
    }
}