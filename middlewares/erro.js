export default function tratarErro(err, req, res, next) {
  console.error(err); // Para logar o erro no console do servidor

  if (err.name === "NotFoundError") { // Exemplo de erro específico do Prisma
    return res.status(404).json({ erro: "Recurso não encontrado" });
  }

  // Erro genérico
  res.status(500).json({ erro: "Erro interno do servidor" });
}
