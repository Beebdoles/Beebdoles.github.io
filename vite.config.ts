import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    {
      name: "trailing-slash-redirect",
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url && !req.url.startsWith("/@") && !req.url.includes(".") && !req.url.endsWith("/")) {
            req.url += "/";
          }
          next();
        });
      },
    },
  ],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        test: resolve(__dirname, "test/index.html"),
      },
    },
  },
});
