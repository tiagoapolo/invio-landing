import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        home: fileURLToPath(new URL("./index.html", import.meta.url)),
        migration: fileURLToPath(
          new URL("./migrar-da-nuvem-fiscal/index.html", import.meta.url),
        ),
      },
    },
  },
});
