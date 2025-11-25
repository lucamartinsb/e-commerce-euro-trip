import express, { type Request, type Response } from 'express'; // Importa o framework Express para criar o servidor web.
import cors from 'cors'; // Importa o middleware CORS para habilitar o compartilhamento de recursos entre origens diferentes.
import helmet from 'helmet'; // Importa o middleware Helmet para melhorar a segurança HTTP.
import dotenv from 'dotenv'; // Importa o módulo dotenv para variáveis de ambiente.
import { connectToDatabase } from './config/database.js'; // Importa a função para conectar ao banco de dados.

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const app = express(); // Cria uma instância do aplicativo Express.
app.use(helmet()); // Usa o Helmet para definir cabeçalhos de segurança HTTP.
app.use(cors()); // Habilita CORS para todas as rotas do servidor.
app.use(express.json()); // Habilita o parsing de JSON no corpo das requisições HTTP.

const PORT = process.env.PORT || 30000; // Define a porta do servidor a partir da variável de ambiente ou usa 30000 como padrão.

connectToDatabase() // Conecta ao banco de dados antes de iniciar o servidor.

// Rota inicial para verificar se o servidor está funcionando:
app.get('/', (req: Request, res: Response) => {
    res.status(200).send('E-commerce Euro Trip Backend is running!');
});


/*  Inicia o servidor e escuta na porta definida: 
    - Deve ser colocado após a conexão com o banco de dados, middlewares e rotas, para garantir que o servidor só inicie se
    a conexão for bem-sucedida e tudo estiver configurado corretamente. */
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT} <- ctrl + click to open in browser!`);
});

