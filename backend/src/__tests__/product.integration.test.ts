import { describe, it, expect, beforeAll, afterAll, vi, beforeEach } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';
import ProductModel from '../models/product.model.js';

// Dados de teste:
const mockProduct = {
    name: 'Sandisk Ultra 128gb',
    price: 151.90,
    description: 'Pendrive Sandisk modelo Ultra com 128gb de armazemaneto e conexão USB 3.2',
    category: 'eletrônicos',
    inStock: true
};

// Estratégia de teste de integração:
describe('Product Integration Tests (POST/GET)', () => {
    // Antes de todos os testes, mockamos a conexão para não usar o DB real.
    beforeAll(async () => {
        vi.spyOn(ProductModel, 'create').mockImplementation((data: any) => {
            return Promise.resolve({
                _id: new mongoose.Types.ObjectId(),
                ...data
            }) as any;
        });
        vi.spyOn(ProductModel, 'find').mockResolvedValue([]);
    });
    // Limpa o histórico de chamdas antes de cada teste:
    beforeEach(() => {
        vi.clearAllMocks();
    })
    // Após todos os testes, limpamos os mocks:
    afterAll(() => {
        vi.restoreAllMocks();
    });
    // Teste POST (Criando o Produto)
    it('should create a new product and return 201', async () => {
        const response = await request(app).post('/api/v1/products').send(mockProduct);
        // Assert (Verificações):
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.name).toBe(mockProduct.name);
        expect(ProductModel.create).toHaveBeenCalledTimes(1);
    });

    // Tste POST (Dados faltando):
    it('should return 400 if Name is required!', async () => {
        const invalidProduct = { price: 100, category: 'eletronicos' }; // situação em que 'name' está ausente.

        // Act (Ação):
        const response = await request(app).post('/api/v1/products').send(invalidProduct);

        // Asset:
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toContain('Name is required!');
        expect(ProductModel.create).not.toHaveBeenCalled(); // Garante que o DB não foi chamado.
    });
});