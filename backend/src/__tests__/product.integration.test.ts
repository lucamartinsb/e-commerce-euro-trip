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

// ID falso, mas válido para o Mongoose:
const MOCK_ID = new mongoose.Types.ObjectId().toString(); 

// Estratégia de teste de integração:
describe('Product Integration Tests (CRUD)', () => {
    // Antes de todos os testes, mockamos a conexão para não usar o DB real.
    beforeAll(async () => {
        // Mock para Create (Simula que criou o produto):
        vi.spyOn(ProductModel, 'create').mockImplementation((data: any) => {
            return Promise.resolve({
                _id: new mongoose.Types.ObjectId(),
                ...data
            }) as any;
        });
        
        // Mock para Find (Listar):
        vi.spyOn(ProductModel, 'find').mockResolvedValue([mockProduct] as any);

        // Mock para Find By ID (Simula sucesso):
        vi.spyOn(ProductModel, 'findById').mockImplementation((id) => {
            // Retorna um produto se o ID for o MOCK_ID, e null se for 404:
            if (id.toString() === MOCK_ID) {
                return Promise.resolve({
                    _id: id,
                    ...mockProduct
                }) as any;
            }
            return Promise.resolve(null) as any;
        });

        // Mock para Patch (Simula que encontrou e atualizou parcialmente o produto):
        vi.spyOn(ProductModel, 'findByIdAndUpdate').mockImplementation((id, data, options) => {
            return Promise.resolve({
                _id: id,
                ...mockProduct,
                ...data // Sobrescreve com os dados atualizados.
            }) as any;
        });

        // Mock para Delete (Simula que encontrou e apagou o produto):
        vi.spyOn(ProductModel, 'findByIdAndDelete').mockResolvedValue({
            _id: new mongoose.Types.ObjectId(),
            ...mockProduct
        } as any);
    });

    // Limpa o histórico de chamadas antes de cada teste:
    beforeEach(() => {
        vi.clearAllMocks(); // Remove as informações de frequência e argumentos das chamadas.
    })

    // Após todos os testes, limpamos os mocks:
    afterAll(() => {
        vi.restoreAllMocks(); // Restaura a implementação original (não mockada) da função. Funciona com vi.spyOn(), com vi.fn() não.
    });

    // Os testes começam abaixo...

    // Teste POST (Criando o Produto com sucesso):
    it('should create a new product and return 201', async () => {
        // Act (Ação):
        const response = await request(app).post('/api/v1/products').send(mockProduct);
        
        // Assert (Verificações):
        expect(response.statusCode).toBe(201); // Retorna o status 201 (Created).
        expect(response.body).toHaveProperty('_id'); // Diz que deve ter a propriedade "_id" dentro do corpo (body).
        expect(response.body.name).toBe(mockProduct.name); // Diz que o 'name' no corpo (body) tem que ser igual ao 'name' no mockProduct.
        expect(ProductModel.create).toHaveBeenCalledTimes(1);
    });

    // Testes POST (name, price e category ausentes (sem sucesso)):
    it('should return 400 if Name is required!', async () => {
        const invalidProduct = { price: 100, category: 'eletronicos' }; // situação em que 'name' está ausente.

        // Act (Ação):
        const response = await request(app).post('/api/v1/products').send(invalidProduct);

        // Asset:
        expect(response.statusCode).toBe(400); // Retorna o status 400 (Bad Request).
        expect(response.body.message).toContain('Name is required!'); // Mensagem no corpo tem que contem 'Name is required!'.
        expect(ProductModel.create).not.toHaveBeenCalled(); // Garante que o DB não foi chamado.
    });

    it('should return 400 if Price is required!', async () => {
        const invalidProduct = { name: 'Teste', category: 'eletronicos' }; // situação em que 'price' está ausente.

        // Act (Ação):
        const response = await request(app).post('/api/v1/products').send(invalidProduct);

        // Asset:
        expect(response.statusCode).toBe(400); // Retorna o status 400 (Bad Request).
        expect(response.body.message).toContain('Price is required!'); // Mensagem no corpo tem que contem 'Price is required!'.
        expect(ProductModel.create).not.toHaveBeenCalled(); // Garante que o DB não foi chamado.
    });

    it('should return 400 if Category is required!', async () => {
        const invalidProduct = { name: 'Teste', price: 100 }; // situação em que 'category' está ausente.

        // Act (Ação):
        const response = await request(app).post('/api/v1/products').send(invalidProduct);

        // Asset:
        expect(response.statusCode).toBe(400); // Retorna o status 400 (Bad Request).
        expect(response.body.message).toContain('Category is required!'); // Mensagem no corpo tem que contem 'Category is required!'.
        expect(ProductModel.create).not.toHaveBeenCalled(); // Garante que o DB não foi chamado.
    });

    // Teste GET (Listando os produtos (com sucesso):
    it('should list all products and return 200', async () => {
        // Act (Ação):
        const response = await request(app).get('/api/v1/products');
        
        // Asset:
        expect(response.statusCode).toBe(200); // Retorna o status 200 (OK).
        expect(Array.isArray(response.body)).toBe(true); // Diz que tem que ser verdadeiro o body contém um objeto Array.
        expect(response.body.length).toBeGreaterThan(0); // Diz que o comprimento do body tem que ser maior que zero.
        expect(ProductModel.find).toHaveBeenCalledTimes(1);
    })

    // Teste GET (Obtendo um produto com sucesso):
    it('should get a product by ID and return 200', async () => {
        // Act (Ação):
        const response = await request(app).get(`/api/v1/products/${MOCK_ID}`);
        
        // Asset:
        expect(response.statusCode).toBe(200); // Retorna o status 200 (OK).
        expect(response.body.name).toBe(mockProduct.name); // Diz que o 'name' do body tem que ser igual ao 'name' do mockProduct.
        expect(ProductModel.findById).toHaveBeenCalledTimes(1);
    });

    // Teste GET (Obtendo um produto sem sucesso):
    it('should return 404 when product is not found', async () => {
        // Um ID diferente do MOCK_ID deve retornar null, conforme configurado no mock
        const NOT_FOUND_ID = new mongoose.Types.ObjectId().toString();
        
        // Act (Ação):
        const response = await request(app).get(`/api/v1/products/${NOT_FOUND_ID}`);
        
        // Asset: 
        expect(response.statusCode).toBe(404); // Retorna o status 404 (Not Found).
        expect(ProductModel.findById).toHaveBeenCalledTimes(1);
    });

    // Teste PATCH (Atualizar parcialmente um produto):
    it('should update a product and return 200', async () => {
        const updatedData = { name: 'Product Updated!' }; // situação em que 'name' é modificado.
        const fakeId = new mongoose.Types.ObjectId().toString();

        // Act (Ação):
        const response = await request(app).patch(`/api/v1/products/${fakeId}`).send(updatedData);

        // Asset:
        expect(response.statusCode).toBe(200); // Retorna o status 200 (OK).
        expect(response.body).contain(updatedData); // Retorna o objeto atualizado.
        expect(ProductModel.create).not.toHaveBeenCalledTimes(1);
    });

    // Teste DELETE (Apagar o Produto):
    it('should delete a product and return 204', async () => {
        const fakeId = new mongoose.Types.ObjectId().toString();

        // Act (Ação):
        const response = await request(app).delete(`/api/v1/products/${fakeId}`);

        // Asset:
        expect(response.statusCode).toBe(204); // Retorna o status 204 (No content).
        expect(response.body).toEqual({}); // Retorna o corpo (body) vazio.
        expect(ProductModel.findByIdAndDelete).toHaveBeenCalledTimes(1);

    })
});
