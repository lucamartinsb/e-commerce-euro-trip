# ----------------------------------------------------
# STAGE 1: Build & Compile (Instalar dependências e compilar o TypeScript)
# ----------------------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar os arquivos de manifesto para instalar as dependências
COPY package.json package-lock.json ./

# Instalar todas as dependências (dev e prod)
# O Vitest e TS-related tools são instalados aqui
RUN npm install

# Copiar todo o código-fonte
COPY . .

# Compilar o TypeScript para JavaScript no diretório 'dist'
RUN npm run build

# ----------------------------------------------------
# STAGE 2: Production (Criar a imagem final, leve e segura)
# ----------------------------------------------------
FROM node:20-alpine

# O ambiente de trabalho deve ser o mesmo
WORKDIR /app

# Copiar apenas os arquivos de produção necessários da stage 'builder'
# 1. package.json e package-lock.json para rodar 'npm install --prod'
COPY --from=builder /app/package.json /app/package-lock.json ./
# 2. O código compilado (.js)
COPY --from=builder /app/dist ./dist/

# Instalar apenas as dependências de produção (mais rápido e menor imagem)
RUN npm install --only=production

# Expor a porta que o servidor Express usa (30000)
EXPOSE 30000

# Variáveis de ambiente (o DB_URL será definido no docker-compose)
ENV NODE_ENV production
ENV PORT 30000

# Comando para iniciar a aplicação (executa o código JavaScript compilado)
# Assume que a sua função 'build' compila para 'dist/server.js'
CMD ["node", "dist/server.js"]