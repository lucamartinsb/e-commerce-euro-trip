import { Router } from 'express';
import productController from '../controllers/product.controller.js'; // Importa as rotas de produtos.
import { uploadProductImage } from '../config/multer.config.js';

const router = Router();

router.get('/', productController.getAllProducts); // Rota para listar todos os produtos.
router.get('/:id', productController.getProductByID); // Rota para listar um produto por ID.

router.post('/', uploadProductImage, productController.createProduct); // Rota para criar um produto com upload de imagem.

router.patch('/:id', productController.updateProduct); // Rota para atualizar um produto por ID.

router.delete('/:id', productController.deleteProduct); // Rota para deletar um produto por ID.
export default router;