import { clsx, type ClassValue } from "clsx";
import { generate } from "short-uuid";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function uuid(): string {
  return generate();
}

export function chunking<T>(arr: T[], size: number): T[][] {
  const chunked: T[][] = [];

  for (let i = 0; i < arr.length; i += size) {
    chunked.push(arr.slice(i, i + size));
  }

  return chunked;
}
