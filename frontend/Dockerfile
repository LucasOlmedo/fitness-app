# frontend/Dockerfile
FROM node:18

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie todos os arquivos do projeto
COPY . .

# Exponha a porta 3000
EXPOSE 3000

# Comando para iniciar o projeto
CMD ["npm", "start"]
