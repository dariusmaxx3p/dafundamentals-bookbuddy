import { DEFAULT_METADATA } from "@/misc/constants";
import HomePage from "@components/pages/home-page";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return DEFAULT_METADATA;
}

export default function Home() {
  return <HomePage />;
}
