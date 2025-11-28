import { Document } from 'mongoose';

// Define a interface IProduct que estende a interface Document do mongoose no formato TypeScript.
export interface IProduct extends Document {
    nome: string;
    price: number;
    description?: string; // Campo opcional
    category: string;
    inStock: boolean;
}