import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import resumo from "./api/resumo.js";

// Na Vercel a pasta /api roda sozinha. Este plugin faz o mesmo no "npm run dev".
function apiLocal() {
  return {
    name: "api-local",
    configureServer(server) {
      server.middlewares.use("/api/resumo", async (req, res) => {
        const partes = [];
        for await (const parte of req) partes.push(parte);

        try {
          req.body = JSON.parse(Buffer.concat(partes).toString() || "{}");
        } catch {
          req.body = {};
        }

        res.status = (codigo) => {
          res.statusCode = codigo;
          return res;
        };
        res.json = (dados) => {
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(dados));
        };

        resumo(req, res);
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), apiLocal()],
});
