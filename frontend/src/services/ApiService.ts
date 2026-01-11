import axios from 'axios';
import type { Product } from '../types/Product';

const apiService = axios.create({
    baseURL: 'http://localhost:30000/api/v1/', // Endereço do backend.
    headers: {
        'Accept': 'application/json'
    },
    timeout: 10000 // 10 segundos de timeout.
});

export default {
    getProducts() {
        return apiService.get<Product[]>('/products');
    },
    getProductById(id: string) {
        return apiService.get<Product>(`/products/${id}`);
    },
    createProduct(data: FormData) {
        return apiService.post<Product>('products', data, {
            headers: { 'Content-Type': 'multipart/form-data' } // Configuração para upload de arquivos (Multer).
        });
    }
};