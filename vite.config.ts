import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    port: 3000,
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
      // {
      //   find: "ngpo",
      //   replacement: path.resolve(__dirname, "src"),
      // },
      // {
      //   find: "@assets",
      //   replacement: path.resolve(__dirname, "./src/assets"),
      // },
      // {
      //   find: "@common",
      //   replacement: path.resolve(__dirname, "./src/common"),
      // },
      // {
      //   find: "@components",
      //   replacement: path.resolve(__dirname, "./src/components"),
      // },
      // {
      //   find: "@config",
      //   replacement: path.resolve(__dirname, "./src/config"),
      // },
      // {
      //   find: "@constant",
      //   replacement: path.resolve(__dirname, "./src/constant"),
      // },
      // {
      //   find: "@containers",
      //   replacement: path.resolve(__dirname, "./src/containers"),
      // },
      // {
      //   find: "@elements",
      //   replacement: path.resolve(__dirname, "./src/elements"),
      // },
      // {
      //   find: "@icons",
      //   replacement: path.resolve(__dirname, "./src/icons"),
      // },
      // {
      //   find: "@layouts",
      //   replacement: path.resolve(__dirname, "./src/layouts"),
      // },
      // {
      //   find: "@lib",
      //   replacement: path.resolve(__dirname, "./src/lib"),
      // },
      // {
      //   find: "@pages",
      //   replacement: path.resolve(__dirname, "./src/pages"),
      // },
      // {
      //   find: "@routers",
      //   replacement: path.resolve(__dirname, "./src/routers"),
      // },
      // {
      //   find: "@schemas",
      //   replacement: path.resolve(__dirname, "./src/schemas"),
      // },
      // {
      //   find: "@themes",
      //   replacement: path.resolve(__dirname, "./src/themes"),
      // },
      // {
      //   find: "@npgo-types",
      //   replacement: path.resolve(__dirname, "./src/types"),
      // },
    ],
  },
});
