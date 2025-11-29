// Agora o server dirá quando a aplicação começa a funcionar (porta, conexão com o DB).

import app from './app.js'; // Importa o app configurado.
import dotenv from 'dotenv'; // Importa o módulo dotenv para variáveis de ambiente.
import { connectToDatabase } from './config/database.js'; // Importa a função para conectar ao banco de dados.

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const PORT = process.env.PORT || 30000; // Define a porta do servidor a partir da variável de ambiente ou usa 30000 como padrão.

connectToDatabase() // Conecta ao banco de dados antes de iniciar o servidor.

/*  
Inicia o servidor e escuta na porta definida: 
- Deve ser colocado após a conexão com o banco de dados, middlewares e rotas, para garantir que o servidor só inicie se
  a conexão for bem-sucedida e tudo estiver configurado corretamente. 
*/
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT} <- ctrl + click to open in browser!`);
});

