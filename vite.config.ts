import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig((config) => {
 const env = loadEnv(config.mode, process.cwd());
 return {
   plugins: [react()],
   build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        404: resolve(__dirname, "public/404.html"),
      },
    },
   },
   server: {
     port: 3000,
     host: true,
     watch: {
      usePolling: true,
     },
     esbuild: {
      target: "esnext",
      platform: "linux",
    },
  },
  define: {
    VITE_NEWS_API_ORG_API_KEY: JSON.stringify(env.VITE_NEWS_API_ORG_API_KEY),
    VITE_THE_GUARDIAN_API_KEY: JSON.stringify(env.VITE_THE_GUARDIAN_API_KEY),
    VITE_NEW_YORK_TIMES_API_KEY: JSON.stringify(env.VITE_NEW_YORK_TIMES_API_KEY),
    
  },
 };
});