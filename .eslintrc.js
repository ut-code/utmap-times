/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["airbnb-typescript-prettier"],
  rules: {
    // DatoCMSが要求
    "no-underscore-dangle": "off",
    // JSXを記述する際に冗長になる
    "@typescript-eslint/explicit-module-boundary-types": "off",
    // TypeScriptとの相性が悪い
    "react/destructuring-assignment": "off",
    // React 17では不要
    "react/react-in-jsx-scope": "off",
    // Next.jsで不便
    "react/require-default-props": "off",
    // next/linkでこの形式が必要
    "jsx-a11y/anchor-is-valid": "off",
  },
  parserOptions: {
    project: "./tsconfig.json",
  },
  ignorePatterns: ["__generated__/*.ts", "__generated_data__/*.ts", "*.js"],
};
