FROM node:11-alpine

# Создать директорию app
WORKDIR /app

# Установить зависимости приложения
# Используется символ подстановки для копирования как package.json, так и package-lock.json,
# работает с npm@5+
COPY package*.json ./

RUN npm install
# Используется при сборке кода в продакшене
# RUN npm install --only=production

# Скопировать исходники приложения
COPY . .
RUN npm run build

EXPOSE 8080
CMD [ "node", "dist" ]