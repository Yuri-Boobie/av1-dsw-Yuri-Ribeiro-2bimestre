import express from "express";
import tarefaRoutes from "./routes/tarefaRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Rota raiz
app.get("/", (req, res) => {
  res.json({
    mensagem: "API de tarefas funcionando!",
    versao: "1.0.0",
    arquitetura: "MVC"
  });
});

// Rotas
app.use(tarefaRoutes);

// Inicia servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\n⛔ Servidor encerrado");
  process.exit(0);
});