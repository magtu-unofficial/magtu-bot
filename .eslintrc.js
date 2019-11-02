module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: [
    "airbnb-base",
    "plugin:prettier/recommended",
    "plugin:jest/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module"
  },
  plugins: ["@typescript-eslint"],
  rules: {},
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  }
};
