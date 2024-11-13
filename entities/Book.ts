export class Book {
  constructor(
    public id: string,
    public title: string,
    public subtitle: string,
    public description: string,
    public cover: string,
    public authors: string[],
    public genres: string[],
    public edition: string,
    public publishedDate: string,
    public publisher: string,
    public pageCount: number,
    public format: string
  ) {}
}
