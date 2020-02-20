export default async (bot, users: Array<number>, msg: string) => {
  const userIds = users.join(",");
  // Отправка пачками по 100 сообщеней
  await bot.execute("messages.send", {
    user_ids: userIds,
    message: msg,
    dont_parse_links: 1,
    random_id: Date.now()
  });
};
