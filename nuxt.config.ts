import { defineNuxtConfig } from "nuxt3";

export default defineNuxtConfig({
  srcDir: "src/",

  publicRuntimeConfig: {
    siteName: "Nuxt3App",
    perPage: 10 //1ページ毎の表示件数
  },

  css: ["~/assets/css/style.css"]
});
