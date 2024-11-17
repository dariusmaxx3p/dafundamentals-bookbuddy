/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextConfig } from "next";
import createPWAConfig from "next-pwa";

const withPWA = createPWAConfig({
  dest: "public", // Output directory for service worker and PWA assets
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development", // Disable PWA in development
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "google-fonts",
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
        },
      },
    },
    // Add more runtime caching rules as needed
  ],
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  sassOptions: {},
};

export default withPWA(nextConfig as any);
