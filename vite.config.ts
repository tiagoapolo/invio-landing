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
        remote: fileURLToPath(new URL("./remote/index.html", import.meta.url)),
        api: fileURLToPath(new URL("./api/index.html", import.meta.url)),
        consultaLc116: fileURLToPath(new URL("./consulta/lc116/index.html", import.meta.url)),
        consultaNbs: fileURLToPath(new URL("./consulta/nbs/index.html", import.meta.url)),
        consultaMunicipio: fileURLToPath(
          new URL("./consulta/codigo-municipio/index.html", import.meta.url),
        ),
      },
    },
  },
});
