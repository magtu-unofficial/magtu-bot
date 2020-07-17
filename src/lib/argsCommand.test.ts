import ArgsCommand from "./argsCommand";

test("должен парсить аргументы без проблела", () => {
  const cmd = new ArgsCommand(
    /test/,
    [
      {
        query: "test",
        parser: str => parseInt(str, 10)
      },
      {
        query: "test2",
        parser: async str => str.toUpperCase()
      }
    ],
    ctx => {
      expect(ctx.session.args[0]).toBe(22);
      expect(ctx.session.args[1]).toBe("FFFFFF");
    }
  );

  cmd.handler({
    text: "/test 22 fffFFF",
    platform: "text",
    user: 13245,
    session: {},
    args: ["22", "fffFFF"]
  });
});

test("должен парсить аргументы с пробелом", () => {
  const cmd = new ArgsCommand(
    /test/,
    [
      {
        query: "test",
        parser: str => parseInt(str, 10)
      },
      {
        query: "test2",
        parser: async str => str.toUpperCase()
      }
    ],
    ctx => {
      expect(ctx.session.args[0]).toBe(22);
      expect(ctx.session.args[1]).toBe("FFFFFF WAT");
    },
    3
  );

  cmd.handler({
    text: "/test 22 fffFFF",
    platform: "text",
    user: 13245,
    session: {},
    args: ["22", "fffFFF", "wat"]
  });
});

test("должен возвращать ошибки", () => {
  const cmd = new ArgsCommand(
    /test/,
    [
      {
        query: "test",
        parser: () => {
          throw Error("test1");
        }
      },
      {
        query: "test2",
        parser: () => {
          throw Error("test2");
        }
      }
    ],
    ctx => {
      expect(ctx.response).toBe("test1\ntest2");
    }
  );

  cmd.handler({
    text: "/test 22 fffFFF",
    platform: "text",
    user: 13245,
    session: {},
    args: ["22", "fffFFF"]
  });
});
