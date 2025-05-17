export default [
  {
    ignores: ["node_modules"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      semi: "error",
      quotes: ["error", "double"]
    },
    languageOptions: {
  ecmaVersion: "latest",
  sourceType: "module",
  globals: {
    browser: true,
  }
},

  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "rules": {
    "quotes": ["error", "double"],
    "semi": ["error", "always"]
  }
  },

  
];
