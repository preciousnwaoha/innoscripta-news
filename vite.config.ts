import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineConfig(({command, mode }) => {
 const env = loadEnv(mode, process.cwd());
 return {
   plugins: [react()],
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