// Agora o app dirá como a aplicação funciona (regras, rotas).

import express, { type Request, type Response } from "express";
import cors from "cors";
import helmet from "helmet";
import productRoutes from './routes/product.routes.js'

const app = express();

//  Middlewares:
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Rotas da API com versionamento:
app.use('/api/v1/products', productRoutes);

// Rota inicial para verificar se o servidor está funcionando:
app.get('/', (req: Request , res: Response) => {
    res.status(200).send({ message: 'Welcome to the E-Commerce Euro Trip!' }); // Retorna uma mensagem de boas-vindas com status 200.
});

export default app; // Exporta o objeto app configurado, mas sem o listen().