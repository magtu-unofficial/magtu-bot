export default class Command {
  constructor(regexp: RegExp, handler: (ctx: any) => Promise<void> | void) {
    this.regexp = regexp;
    this.handler = handler;
  }

  check(req: string) {
    return this.regexp.test(req);
  }

  regexp: RegExp;
  handler: (ctx: any) => Promise<void> | void;
}
