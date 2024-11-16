import { TYPES } from "@/types";
import GenresRepository from "@adapters/repositories/GenresRepository";
import { inject, injectable } from "inversify";
import "reflect-metadata";

export type GetGenresInput = {
  locale: string;
};

@injectable()
export default class GetGenres {
  constructor(
    @inject(TYPES.GENRES_REPOSITORY) private genresRepository: GenresRepository
  ) {}

  async execute(input: GetGenresInput) {
    const { locale } = input;
    return this.genresRepository.getGenres(locale);
  }
}
