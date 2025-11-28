import { describe, it, expect, vi, afterEach } from 'vitest';
import mongoose from 'mongoose';
import { connectToDatabase } from '../config/database.js'; 

// Mocking do Mongoose
// O Vitest usa 'vi' (equivalente a 'jest')
vi.mock('mongoose', async () => {
    return {
        default: {
  connect: vi.fn(), 
  connection: {
    readyState: 0,
    on: vi.fn(),
    once: vi.fn(),
  },
  Types: {
    // Mocka a função isValid, essencial para o controller
    ObjectId: {
        isValid: vi.fn((id) => id !== 'invalid-id-format'),
    },
  },
},
Schema: (await vi.importActual('mongoose')).Schema,
model: (await vi.importActual('mongoose')).model,
    };
});

describe('Database Connection', () => {
  // Configuração para restaurar o estado após cada teste
  // Isso é importante para que os 'spies' de console e process.exit sejam limpos
  afterEach(() => {
    vi.restoreAllMocks();
  });

  // Teste 1: Conexão bem-sucedida
  it('should call mongoose.connect and log success', async () => {
    // 1. Arrange (Preparação): Define o mock para sucesso
    (mongoose.connect as ReturnType<typeof vi.fn>).mockResolvedValue(true); 

    // Cria um 'spy' para monitorar se console.log foi chamado
    const consoleSpy = vi.spyOn(console, 'log');

    // 2. Act (Ação): Executa a função
    await connectToDatabase();

    // 3. Assert (Verificação): 
    expect(mongoose.connect).toHaveBeenCalledOnce();
    expect(consoleSpy).toHaveBeenCalledWith('Connected to the database successfully. 🟢');
  });

  // Teste 2: Conexão falhada (verificando se o processo é encerrado)
  it('should handle connection failure and exit process', async () => {
    // 1. Arrange (Preparação): Define o mock para falha
    (mongoose.connect as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Connection failed'));
    
    // Mocka o process.exit para que o Vitest não feche o terminal
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation((() => {}) as any); 
    const consoleErrorSpy = vi.spyOn(console, 'error');

    // 2. Act (Ação): Executa a função
    await connectToDatabase();

    // 3. Assert (Verificação):
    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(exitSpy).toHaveBeenCalledWith(1); 
  });
});