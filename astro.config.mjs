import { defineConfig } from "astro/config";

export default defineConfig({
  // Cloudflare Pages serves the contents of dist/ as a static site.
  output: "static",
  build: { format: "file" },
  compressHTML: true,
  vite: {
    build: {
      // Fonts are already woff2; don't let Vite inline them as base64.
      assetsInlineLimit: 0,
    },
  },
});
