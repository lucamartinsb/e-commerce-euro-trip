export interface Product {
    _id: string; // No Backend, o Mongoose gera isto automaticamente, mas no Frontend precisamos de declará-lo para usar como chave (key) nas listas e nos links.
    name: string;
    description: string;
    price: number;
    category: string;
    inStock: boolean;
    imageUrl?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

