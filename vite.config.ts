import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { callLlmChat, resolveLlmEnv, type ChatTurn } from "./server/llmChat";

function localChatApiPlugin(env: Record<string, string>): Plugin {
  return {
    name: "local-chat-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split("?")[0];
        if (url !== "/api/chat" || req.method !== "POST") {
          next();
          return;
        }

        try {
          const chunks: Buffer[] = [];
          for await (const chunk of req) {
            chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
          }
          const raw = Buffer.concat(chunks).toString("utf8");
          const body = raw ? JSON.parse(raw) : {};
          const input = typeof body.input === "string" ? body.input.trim() : "";
          if (!input) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "input 不能为空" }));
            return;
          }

          const { apiKey, baseUrl, model } = resolveLlmEnv(env);
          const result = await callLlmChat({
            input,
            history: Array.isArray(body.history) ? (body.history as ChatTurn[]) : [],
            apiKey,
            baseUrl,
            model,
          });

          res.statusCode = 'error' in result ? result.status : 200;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify(
              'error' in result ? { error: result.error } : { reply: result.text },
            ),
          );
        } catch (error) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              error: error instanceof Error ? error.message : "本地 /api/chat 失败",
            }),
          );
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [
      react(),
      mode === "development" && componentTagger(),
      mode === "development" && localChatApiPlugin(env),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
    },
  };
});
