import { defineConfig } from "vite";

export default defineConfig({
    base: "",
    css: {
        postcss: {
            plugins: [],
        },
    },
    build: {
        rollupOptions: {
            output: {
                entryFileNames: "main.js",
                assetFileNames: "main.css",
                chunkFileNames: "chunk.js",
                manualChunks: undefined,
            },
        },
    },
});