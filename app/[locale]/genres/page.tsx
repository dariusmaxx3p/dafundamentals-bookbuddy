import { DEFAULT_METADATA } from "@/misc/constants";

export async function generateMetadata() {
  return {
    ...DEFAULT_METADATA,
    title: "Genres",
  };
}

export default function GeneresPage() {
  return <div>This is Generes page</div>;
}
