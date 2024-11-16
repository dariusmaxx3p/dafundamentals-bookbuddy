import { TYPES } from "@/types";
import GenresRepository from "@adapters/repositories/GenresRepository";
import { inject, injectable } from "inversify";
import "reflect-metadata";

@injectable()
export default class GetGenres {
  constructor(
    @inject(TYPES.GENRES_REPOSITORY) private genresRepository: GenresRepository
  ) {}

  async execute() {
    return this.genresRepository.getGenres();
  }
}
