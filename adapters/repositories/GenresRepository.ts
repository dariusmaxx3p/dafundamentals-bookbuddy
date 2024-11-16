import { TYPES } from "../../types";
import type { ILogger } from "@usecases/Logging";
import type { IMetrics } from "@usecases/SimpleMetrics";
import { inject, injectable } from "inversify";
import "reflect-metadata";

const GENRES = [
  "Fiction",
  "Non-Fiction",
  "Science Fiction",
  "Fantasy",
  "Mystery",
  "Thriller",
  "Romance",
  "Horror",
  "Biography",
  "Memoir",
  "Self-Help",
  "Cookbook",
  "Art",
  "History",
  "Travel",
  "Children's",
  "Young Adult",
  "Poetry",
  "Graphic Novel",
  "Comic Book",
  "Manga",
  "Dystopian",
  "Adventure",
  "Western",
  "Historical Fiction",
  "Literary Fiction",
  "Short Stories",
  "Plays",
  "Essays",
  "Anthology",
  "Encyclopedia",
  "Dictionary",
  "Textbook",
  "Reference",
  "Guide",
  "Journal",
  "Magazine",
  "Newspaper",
  "Periodical",
  "Almanac",
  "Atlas",
  "Gazetteer",
  "Directory",
  "Yearbook",
  "Calendar",
  "Catalog",
  "Manual",
  "Handbook",
  "Workbook",
  "Guidebook",
];

@injectable()
export default class GenresRepository {
  constructor(
    @inject(TYPES.LOGGER) private logger: ILogger,
    @inject(TYPES.METRICS) private metrics: IMetrics
  ) {}

  async getGenres() {
    const endTimer = this.metrics.startTimer("getGenres");
    try {
      return GENRES;
    } catch (err) {
      this.logger.error((err as Error).message);
      return [];
    } finally {
      endTimer();
    }
  }
}
