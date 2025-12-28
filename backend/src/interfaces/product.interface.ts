import { Document } from 'mongoose';

// Define a interface IProduct que estende a interface Document do mongoose no formato TypeScript.
export interface IProduct extends Document {
    name: string;
    price: number;
    description?: string; // Campo opcional.
    category: string;
    inStock: boolean;
    imageUrl?: string // Caminho para imagem opcional.
}