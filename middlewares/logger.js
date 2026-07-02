// Middleware de log — registra cada requisição no terminal
export default function logger(req, res, next) {
  // 1. Marca o início do tempo em milissegundos
  const inicio = Date.now();

  // 2. Escuta o evento 'finish', disparado quando a resposta terminar de ser enviada
  res.on('finish', () => {
    // Calcula a duração subtraindo o tempo atual do tempo de início
    const duracao = Date.now() - inicio;

    // Obtém o timestamp atual no formato ISO (ex: [2026-04-06T10:15:30.123Z])
    const timestamp = new Date().toISOString();

    // 3. Imprime no terminal exatamente no formato esperado pelo exercício
    console.log(`[${timestamp}] ${req.method} ${req.url} -> ${res.statusCode} (${duracao}ms)`);
  });

  // Não se esqueça de chamar o next() para a requisição continuar fluindo para o controller!
  next();
}