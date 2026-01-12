/* https://nuxt.com/docs/4.x/api/nuxt-config */
export default defineNuxtConfig({
  app: {
    head: {
      title: 'UVA – Cronograma universitário',
      htmlAttrs: {
        lang: 'pt-BR',
      },
    },
  },
  compatibilityDate: "2024-04-03",
  content: {
    database: {
      type: "d1",
      bindingName: "DB",
    },
  },
  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },
  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxt/a11y",
  ],
  nitro: {
    preset: "cloudflare_pages",
  },
  ui: {
    theme: {
      colors: [
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        /* Minhas cores */
        "agente",
        "comemorativa",
        "evento",
        "feriado",
      ],
    },
  },
});
