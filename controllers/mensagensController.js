import prisma from '../prisma/client.js'; // importa o singleton do Prisma

// GET /mensagens — lista todas as mensagens (mais recentes primeiro, com dados do autor)
export async function listarMensagens(req, res) {
  const mensagens = await prisma.mensagem.findMany({
    orderBy: { criadoEm: 'desc' },  // mais recente primeiro
    include: {
      autor: {                        // traz dados do autor junto
        select: {
          nome: true,                 // nome do autor
          fotoUrl: true,              // foto do autor
        },
      },
    },
  });
  res.json(mensagens); // retorna a lista com autor embutido
}

// --- Stubs para o desafio do aluno ---

// 🎯 POST /mensagens — cria uma nova mensagem
// Siga o mesmo padrão do criarAluno
// Valide que texto não está vazio (400 se faltar)
export async function criarMensagem(req, res) {
  try {
    // 1. Extraia texto, imagemUrl e autorId de req.body
    const { texto, imagemUrl, autorId } = req.body;

    // 2. Valide: se texto não existir, retorne 400
    if (!texto || texto.trim() === "") {
      return res.status(400).json({ erro: "O campo texto é obrigatório." });
    }

    // 3. Crie com prisma.mensagem.create()
    const mensagemCriada = await prisma.mensagem.create({
      data: {
        texto,
        imagemUrl,
        // Garantindo que o autorId vá como número para o Prisma
        autorId: Number(autorId) 
      }
    });

    // 4. Retorne 201 com a mensagem criada
    return res.status(201).json(mensagemCriada);

  } catch (error) {
    // Tratamento de erro caso ocorra algum problema no banco (ex: autorId não existe)
    return res.status(500).json({ error: "Erro ao criar a mensagem." });
  }
}

// 🎯 DELETE /mensagens/:id — deleta uma mensagem
// Siga o mesmo padrão do deletarAluno
export async function deletarMensagem(req, res) {
  try {
    // 1. Extrai o ID dos parâmetros da requisição
    const { id } = req.params;

    // 2. Executa a lógica de deleção (Adapte para o seu ORM/Banco, ex: Mensagem.delete, MensagemService.delete, etc.)
    // Se o seu ID for numérico no banco, lembre-se de converter: Number(id)
    await prisma.mensagem.delete({
      where: { id: Number(id) } 
    });

    // 4. Sucesso: Retorna status 204 (No Content) sem corpo
    return res.status(204).send();

  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ erro: "Mensagem não encontrada." });
    }

    // Tratamento de erro interno do servidor
    console.error("Erro ao deletar mensagem:", error);
    return res.status(500).json({ erro: "Erro interno do servidor." });
  }
}