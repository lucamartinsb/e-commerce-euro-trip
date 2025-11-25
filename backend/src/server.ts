import express, { type Request, type Response } from 'express'; // Importa o framework Express para criar o servidor web.
import cors from 'cors'; // Importa o middleware CORS para habilitar o compartilhamento de recursos entre origens diferentes.
import helmet from 'helmet'; // Importa o middleware Helmet para melhorar a segurança HTTP.
import dotenv from 'dotenv'; // Importa o módulo dotenv para variáveis de ambiente.

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const app = express(); // Cria uma instância do aplicativo Express.
app.use(helmet()); // Usa o Helmet para definir cabeçalhos de segurança HTTP.
app.use(cors()); // Habilita CORS para todas as rotas do servidor.
app.use(express.json()); // Habilita o parsing de JSON no corpo das requisições HTTP.

const PORT = process.env.PORT || 30000; // Define a porta do servidor a partir da variável de ambiente ou usa 30000 como padrão.

app.listen(PORT, () => { // Inicia o servidor na porta definida. Mantém o servidor ouvindo requisições na porta especificada.
console.log(`Server is running on http://localhost:${PORT}`);
});

// Rota inicial para verificar se o servidor está funcionando:
app.get('/', (req: Request, res: Response) => {
    res.send('E-commerce Euro Trip Backend is running!');
});


