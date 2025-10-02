import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: process.env.VITE_HOST || "::",
    port: parseInt(process.env.VITE_PORT || "8080"),
    allowedHosts: [
      "localhost",
      "127.0.0.1",
      "pof.tortorcoin.top"
    ],
    // Ensure static files are served correctly
    fs: {
      strict: false,
      allow: ['..']
    }
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Ensure static assets are served properly
  publicDir: "public",
  assetsInclude: ["**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.gif", "**/*.svg", "**/*.ico"],
  // Build configuration
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  }
});
