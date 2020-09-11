import Command from "./command";

test("должен проверять по регекспу", () => {
  const cmd = new Command(/test/, () => {});
  expect(cmd.check("test")).toBe(true);
  expect(cmd.check("/test")).toBe(true);
  expect(cmd.check("dads")).toBe(false);
});
