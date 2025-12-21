import { defineConfig } from "orval";

export default defineConfig({
  petstore: {
    // input: {
    //   target: "http://localhost:3000/api/api.yaml",
    // },
    // output: "./src/petstore2.ts",
    input: {
      // URL к вашему YAML-файлу спецификации
      target: "http://localhost:3000/api/api.yaml",
      // Опционально: проверка валидности схемы перед генерацией
      // validation: true,
      // httpClient: "axios",
    },
    output: {
      // mode: "single", // Все типы и функции в одном файле
      mode: "tags",
      target: "./src/orval/",
      // client: "axios", // Можно изменить на 'react-query', 'swr', 'fetch' и др.
      client: "react-query", // Можно изменить на 'react-query', 'swr', 'fetch' и др.
      // mock: true, // Генерация MSW моков (по желанию)
    },
  },
});

// module.exports = {
//   petstore: {
//     // input: {
//     //   target: "http://localhost:3000/api/api.yaml",
//     // },
//     // output: "./src/petstore2.ts",
//     input: {
//       // URL к вашему YAML-файлу спецификации
//       target: "http://localhost:3000/api/api.yaml",
//       // Опционально: проверка валидности схемы перед генерацией
//       // validation: true,
//       httpClient: "axios",
//     },
//     output: {
//       // mode: "single", // Все типы и функции в одном файле
//       target: "./src/petstore2.ts",
//       // client: "axios", // Можно изменить на 'react-query', 'swr', 'fetch' и др.
//       // mock: true, // Генерация MSW моков (по желанию)
//     },
//   },
// };
