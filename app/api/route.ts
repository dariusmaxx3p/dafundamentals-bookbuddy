import { genBooks } from "@/scripts/gen-books";

export async function GET() {
  genBooks();

  return Response.json({ message: "Books generated" });
}
