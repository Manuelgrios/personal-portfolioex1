import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import { cloudflare } from "@cloudflare/vite-plugin";

const base = process.env.VITE_BASE_PATH || "/personal-portfolioex1/";

export default defineConfig({
  base,
  plugins: [react(), tailwindcss(), cloudflare()],
});
