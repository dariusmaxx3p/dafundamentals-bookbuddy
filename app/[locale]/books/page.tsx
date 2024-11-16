import { DEFAULT_METADATA } from "@/misc/constants";
import BooksPage from "@components/pages/books-page";

export async function generateMetadata() {
  return {
    ...DEFAULT_METADATA,
    title: "Books",
  };
}

export default function Books() {
  return <BooksPage />;
}
