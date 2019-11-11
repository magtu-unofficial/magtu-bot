import Ikeyboard from "./keyboard";

export default interface Iarg {
  name: string;
  query: string;
  error: string;
  help: string;
  keyboard: Array<Array<Ikeyboard>>;
  parser: (str: string) => any;
}
