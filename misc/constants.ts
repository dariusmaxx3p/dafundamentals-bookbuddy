import { Metadata } from "next";

export const DEFAULT_METADATA: Metadata = {
  title: "BookBuddy",
  description:
    "BookBuddy is a platform that allows users to share and exchange books with others.",
  icons: [
    {
      rel: "icon",
      url: "/favicon/favicon.ico",
      type: "image/x-icon",
    },
    {
      rel: "apple-touch-icon",
      url: "/favicon/apple-touch-icon.png",
      type: "image/png",
      sizes: "180x180",
    },
    // 16x16, 32x32
    {
      rel: "icon",
      url: "/favicon/favicon-16x16.png",
      type: "image/png",
      sizes: "16x16",
    },
    {
      rel: "icon",
      url: "/favicon/favicon-32x32.png",
      type: "image/png",
      sizes: "32x32",
    },
    // Android 192x192, 512x512
    {
      rel: "icon",
      url: "/favicon/android-chrome-192x192.png",
      type: "image/png",
      sizes: "192x192",
    },
    {
      rel: "icon",
      url: "/favicon/android-chrome-512x512.png",
      type: "image/png",
      sizes: "512x512",
    },
  ],
};

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "/api";

export const CONFIG_URL = process.env.NEXT_PUBLIC_CONFIG_URL ?? "/api/config/config.json";