import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
      // 本地开发绕过浏览器 CORS：前端可把 VITE_LLM_API_BASE_URL 设为 /llm-api
      proxy: {
        "/llm-api": {
          target: "https://api.gotoken.top",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/llm-api/, ""),
        },
      },
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
    },
  };
});
