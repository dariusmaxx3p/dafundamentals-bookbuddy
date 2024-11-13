export class User {
  constructor(
    public id: string,
    public username: string,
    public email: string,
    public wishlist: string[],
    public readingList: string[]
  ) {}
}
