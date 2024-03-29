module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react", "react-hooks"],
  parserOptions: {
    project: ["./tsconfig.json", "./*/tsconfig.json"]
  },
  extends: [
    "prettier",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  rules: {
    "@typescript-eslint/no-non-null-assertion": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-use-before-define": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/ban-ts-comment": 2,
    "@typescript-eslint/ban-types": 0,
    "@typescript-eslint/class-literal-property-style": 2,
    "@typescript-eslint/naming-convention": 0,
    "@typescript-eslint/no-unused-vars": 1,
    "@typescript-eslint/no-empty-interface": 0,
    "@typescript-eslint/no-unsafe-member-access": 0,
    "@typescript-eslint/no-unsafe-assignment": 0,
    "@typescript-eslint/no-unsafe-call": 0,
    "@typescript-eslint/no-unsafe-return": 0,
    "@typescript-eslint/restrict-template-expressions": 0,
    "@typescript-eslint/no-floating-promises": 0,
    "@typescript-eslint/require-await": 0,
    "@typescript-eslint/strict-boolean-expressions": 0,
    "no-redeclare": 0,
    "no-restricted-imports": [
      "error",
      {
        // local dist imports
        patterns: ["../**/dist/**/*"]
      }
    ],
    "react/display-name": 0,
    "react-hooks/rules-of-hooks": 2,
    "react-hooks/exhaustive-deps": 2,
    "react/prop-types": 0,
    "no-mixed-spaces-and-tabs": 0,
    "array-callback-return": 0,
    "no-fallthrough": 0,
    "jsx-a11y/media-has-caption": 0
  }
};
