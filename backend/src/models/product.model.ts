import { Schema, model } from 'mongoose';
import { type IProduct } from '../interfaces/product.interface.js';

// Define o schema do produto com os campos e tipos de dados necessários:
const productSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String, required: true },
    inStock: { type: Boolean, required: true, default: true },
    imageUrl: { type: String }
}, {
    timestamps: true, // Adiciona automaticamente os campos createdAt e updatedAt.
    collection: 'products' // Define o nome da coleção no MongoDB.
});

const ProductModel = model<IProduct>('Product', productSchema);

export default ProductModel;