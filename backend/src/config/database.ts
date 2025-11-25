import mongoose from "mongoose"; // Importa o módulo mongoose para interagir com o MongoDB

export const connectToDatabase = async () => { // Exporta uma função assíncrona para conectar ao banco de dados.
    try { // Inicia um bloco try para tentar conectar ao banco de dados.
        await mongoose.connect(process.env.DB_URL as string); // Tenta conectar ao banco de dados MongoDB usando a URL definida no arquivo '.env'.
        console.log("Connected to the database successfully. 🟢"); // Mostra uma mensagem de sucesso se a conexão for bem-sucedida.
    } catch (error) { // Captura qualquer erro que ocorra durante a tentativa de conexão.
        console.error("Error connecting to the database: ", error); // Mostra uma mensagem de erro se a conexão falhar.
        process.exit(1); // Encerra o processo com um código de erro 1, indicando falha na conexão. Também impede que o app.listen seja chamado sem uma conexão ativa.
    }
}