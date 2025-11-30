# 🌍 E-Commerce Euro Trip API

> Uma API RESTful robusta para e-commerce, construída com foco em **Arquitetura Limpa**, **Qualidade de Código** e **DevOps**.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

---

## 📖 Sobre o Projeto

Este projeto é o backend de uma plataforma de e-commerce. O objetivo principal foi desenvolver uma aplicação escalável e manutenível, seguindo as melhores práticas de engenharia de software modernas.

### Diferenciais Técnicos
* **Arquitetura em Camadas:** Separação clara de responsabilidades (Controller, Service/Model, Routes).
* **Tipagem Estrita:** Uso intensivo de **TypeScript** para segurança e previsibilidade.
* **Testes Automatizados:** Cobertura de testes unitários e de integração (CRUD completo) usando **Vitest** e **Supertest**.
* **Containerização:** Ambiente de desenvolvimento reprodutível com **Docker** e **Docker Compose**.
* **Segurança:** Implementação de middlewares como **Helmet** e **CORS**.

---

## 🛠️ Tech Stack

* **Runtime:** Node.js (v20)
* **Linguagem:** TypeScript
* **Framework:** Express.js
* **Banco de Dados:** MongoDB (via Mongoose)
* **Testes:** Vitest & Supertest
* **Infraestrutura:** Docker & Docker Compose

---

## 🚀 Como Rodar o Projeto

Você pode rodar a aplicação de duas formas: usando Docker (recomendado) ou localmente com NPM.

### Opção 1: Via Docker (Recomendado)

Garanta que você tenha o **Docker** e o **Docker Compose** instalados.

1.  Clone o repositório:
    ```bash
    git clone [https://github.com/SEU-USUARIO/ecommerce-euro-trip.git](https://github.com/SEU-USUARIO/ecommerce-euro-trip.git)
    cd ecommerce-euro-trip/backend
    ```

2.  Suba o ambiente (App + MongoDB):
    ```bash
    docker-compose up --build
    ```

3.  Acesse a API em: `http://localhost:30000`

### Opção 2: Rodando Localmente

1.  Instale as dependências:
    ```bash
    npm install
    ```

2.  Crie um arquivo `.env` na raiz com sua string de conexão:
    ```env
    PORT=30000
    DB_URL=mongodb://localhost:27017/ecommerce-euro-trip (ou do seu Mongo Altas, caso tenha.)
    NODE_ENV=development
    ```

3.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

---

## 🧪 Testes

A qualidade do código é garantida por uma suíte de testes automatizados.

```bash
# Rodar todos os testes (Unitários e Integração)
npm test

# Rodar com cobertura de código
npm run test:coverage