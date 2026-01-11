import type { Request, Response } from 'express';
import ProductModel from '../models/product.model.js';
import { type IProduct } from '../interfaces/product.interface.js';
import mongoose from 'mongoose';

// Rota para listar todos os produtos:
const getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products: IProduct[] = await ProductModel.find<IProduct>({}); // Busca todos os produtos no banco de dados.
        res.status(200).json(products); // Retorna os produtos encontrados com status 200.
    } catch (error) {
        res.status(500).json({message: 'Error fetching products', error}); // Retorna erro 500 em caso de falha na busca.
    }
};

// Rota para listar um produto por ID:
const getProductByID = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // Extrai o ID do produto dos parâmetros da requisição.
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({message: 'Invalid product ID format!'}); // Retorna erro 400 se o formato do ID for inválido.
        return;
    }
    try {
        const product: IProduct | null = await ProductModel.findById(id); // Busca o produto pelo ID no banco de dados.
        if (!product) {
            res.status(404).json({message: 'Product not found!'}); // Retorna erro 404 se o produto não for encontrado.
            return;
        } else {
            res.status(200).json(product); // Retorna o produto encontrado com status 200.
        }
    } catch (error) {
        res.status(500).json({message: 'Error fetching product by ID', error}); // Retorna erro 500 em caso de falha na busca.
    }
};

const createProduct = async (req: Request, res: Response): Promise<void> => {
    const { name, price, category, description, inStock } = req.body; // Extrai os dados do produto do corpo da requisição.
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined; // Pega o caminho do ficheiro que o Multer adicionou, se existir.
    const productData: Partial<IProduct> = { // Certifique-se de que imageUrl está incluído no body
        name: String(name),
        price: Number(price),
        category: String(category),
        description: String(description),
        inStock: Boolean(inStock),
        ...(imageUrl && { imageUrl })
    };
    
    /* if (!name) {
            res.status(400).json({message: 'Name is required!'});
            return;
    }
    if (!price) {
            res.status(400).json({message: 'Price is required!'});
            return;
    }
    if (!category) {
            res.status(400).json({message: 'Category is required!'});
            return;
    }
    if (!description) {
            res.status(400).json({message: 'Description is required!'});
            return;
    }
    if (inStock === undefined) {
            res.status(400).json({message: 'InStock is required!'});
            return;
    } */
    try {
        const savedProduct = await ProductModel.create(productData); // Cria e salva o novo produto no banco de dados.
        res.status(201).json(savedProduct); // Retorna o produto salvo com status 201.
    } catch (error) {
        res.status(500).json({message: 'Error creating product', error}); // Retorna erro 500 em caso de falha na criação.
    }
};

const updateProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // Extrai o ID do produto dos parâmetros da requisição.
    const updatedData: Partial<IProduct> = req.body; // Dados atualizados do produto.
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({message: 'Invalid product ID format!'}); // Retorna erro 400 se o formato do ID for inválido.
        return;
    }
    try {
        const updatedProduct: IProduct | null = await ProductModel.findByIdAndUpdate(
            id,
            updatedData,
            { new: true } // Retorna o documento atualizado.
        );
        if (!updatedProduct) {
            res.status(404).json({message: 'Product not found!'}); // Retorna erro 404 se o produto não for encontrado.
            return;
        }
        res.status(200).json(updatedProduct); // Retorna o produto atualizado com status 200.
    } catch (error) {
        res.status(500).json({message: 'Error updating product', error}); // Retorna erro 500 em caso de falha na atualização.
    }
};

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // Extrai o ID do produto dos parâmetros da requisição.
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({message: 'Invalid product ID format!'}); // Retorna erro 400 se o formato do ID for inválido.
    }
    try {
        const deletedProduct: IProduct | null = await ProductModel.findByIdAndDelete(id); // Deleta o produto pelo ID no banco de dados.
        if (!deletedProduct) {
            res.status(404).json({message: 'Product not found!'}); // Retorna erro 404 se o produto não for encontrado.
            return;
        }
        res.status(204).send(); // Retorna o produto deletado com status 204.
    } catch (error) {
        res.status(500).json({message: 'Error deleting product', error}); // Retorna erro 500 em caso de falha na deleção.
    }
}

export default {
    getAllProducts,
    getProductByID,
    createProduct,
    updateProduct,
    deleteProduct
}   