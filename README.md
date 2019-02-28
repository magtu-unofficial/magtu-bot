# magtu-bot

[Бот в ВК](https://vk.me/mpkbot). отпрвляет замены и расписание по запросу. Данные берет из MongoDB от [парсера](https://github.com/ivanik7/magtu-parser).

[![Build Status](https://travis-ci.org/ivanik7/magtu-bot.svg?branch=master)](https://travis-ci.org/ivanik7/magtu-bot)

## Как это запустить

Для запуска в .env или переменных окружния надо прописать путь к фаилу от гугла дял DialogFlow, токен и код подтверждения от вк

### Запуск для разработки

```sh
npm install
npm run dev
```

### Запуск для продакшена

```sh
npm install
npm run build
npm start
```
