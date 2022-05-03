FROM node:13-alpine

# Создать директорию app
WORKDIR /app

# Установить зависимости приложения
# Используется символ подстановки для копирования как package.json, так и package-lock.json,
COPY package*.json ./

RUN npm install

# Скопировать исходники приложения
COPY . .
# RUN npm run test && npm run build
RUN npm run build

EXPOSE 8080
CMD [ "node", "dist" ]
