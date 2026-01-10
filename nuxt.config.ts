/* https://nuxt.com/docs/4.x/api/nuxt-config */
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },
  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxt/a11y",
  ],
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
