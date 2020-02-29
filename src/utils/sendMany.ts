const CHUNK_SIZE = 100;

export default async (bot, users: Array<number>, msg: string) => {
  for (let i = 0; i < users.length; i += CHUNK_SIZE) {
    const chunk = users.slice(i, i + CHUNK_SIZE).join(",");

    await bot.execute("messages.send", {
      user_ids: chunk,
      message: msg,
      dont_parse_links: 1,
      random_id: Date.now()
    });
  }
};
