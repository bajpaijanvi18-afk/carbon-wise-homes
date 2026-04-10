import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ✅ Correct Vite config
export default defineConfig({
    plugins: [react()],
    root: ".",              // make sure it's pointing to the project root
    publicDir: "public",
    build: {
        outDir: "dist",
    },
    server: {
        port: 5173,           // change from 8080 to default if needed
        open: true,
    },
});
