// import fetch, { Response } from "node-fetch";
import Vk from "./vk";

jest.mock("node-fetch");

const config = {
  confirm: "abc123",
  token: "qwertyuio",
  secret: "secretkek",
  path: "/vk"
};

describe("Создание контекста", () => {
  test("Должен создавать контест с пользователем", () => {
    const body = {
      object: {
        message: {
          from_id: 1,
          peer_id: 1,
          text: "kek"
        }
      }
    };
    expect(new Vk(config).createCtx(body)).toMatchObject({
      chat: 1,
      user: 1,
      isChat: false,
      text: "kek",
      platform: "vk"
    });
  });

  test("Должен создавать контест с груповым чатом", () => {
    const body = {
      object: {
        message: {
          from_id: 1,
          peer_id: 2,
          text: "kek"
        }
      }
    };
    expect(new Vk(config).createCtx(body)).toMatchObject({
      chat: 2,
      user: 1,
      isChat: true,
      text: "kek",
      platform: "vk"
    });
  });
});
