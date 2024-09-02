import pluginJs from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";


export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"]
  },
  {
    languageOptions: { globals: globals.node }
  },
  {
    rules: {
      "no-unused-vars": "error", // Marca como erro variáveis não utilizadas
      "eqeqeq": ["error", "always"], // Exige o uso de === e !==
      "semi": ["error", "always"], // Exige ponto e vírgula no final das declarações
      "indent": ["error", 2], // Define indentação de 2 espaços
      "quotes": ["error", "double"], // Exige o uso de aspas dublas
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
