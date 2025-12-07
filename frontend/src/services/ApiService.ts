import axios from 'axios';
import type { Product } from '../types/Product';

const apiService = axios.create({
    baseURL: 'http://localhost:30000/api/v1/', // Endereço do backend.
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout: 1000 // 10 segundos de timeout.
});

export default {
    GetProducts() {
        return apiService.get<Product[]>('/products');
    },
    createProduct(product: Omit<Product, '_id'>) {
        return apiService.post<Product>('products', product)
    }
};