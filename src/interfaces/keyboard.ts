enum color {
  primary = "primary",
  default = "default",
  negative = "negative",
  positive = "positive"
}

export default interface Ikeyboard {
  payload?: object;
  label: string;
  color: color;
}

export { color };
