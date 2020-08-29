# magtu-bot

[Бот](https://ivanik.ru/mpk) для [VK](https://vk.com/mpkbot), [Telegram](https://t.me/mpkmgnbot) и [Viber](https://ivanik.ru/mpk), который отправляет замены и расписание по запросу. Данные берет из MongoDB от [парсера](https://github.com/ivanik7/magtu-parser).

[![Uptime](https://img.shields.io/uptimerobot/ratio/m783154459-f4ad7b6076bb36930570381f)](https://status.ivanik.ru)
[![Docker Build](https://img.shields.io/docker/cloud/build/ivanik/magtu-bot.svg)](https://hub.docker.com/r/ivanik/magtu-bot)

Для запуска в .env или переменных окружения надо написать токены, секрет код подтверждения для ВК, адреса для вебхуко, и токен бота и id админа в телеграме для отправки отладочной информации с продакшена. Примеры смотрите в `.env.example`

```sh
npm install
npm run build
npm start
```

Буду рад любым предложениям и пулреквастам. [Я в телеграмме](https://t.me/ivanik7)
