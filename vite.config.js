import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import jsconfigPaths from "vite-jsconfig-paths";
import path from "path";

export default defineConfig({
  base: './',
  plugins: [jsconfigPaths(), react()],
  resolve: {
    alias: {
      public: path.resolve(__dirname, "./public"),
    },
  },
  build: {
    outDir: 'build',
    assetsDir: './',
    sourcemap: true,
  }
});

