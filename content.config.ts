import {
  defineContentConfig,
  defineCollection,
} from "@nuxt/content";
import { z } from "zod";

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: "page",
      source: "**",
    }),
    semestres: defineCollection({
      type: "data",
      source: "semestres/**.{yaml,yml}",
      schema: z.object({
        nome: z.string(),
        nome_longo: z.string(),
        nivel: z.enum(["grad", "pos"]),
        url: z.string().url().optional(),
        oficios: z.array(z.string()).optional(),
        dias_letivos: z.number().optional(),
        ini: z.date(),
        fim: z.date().optional(),
        eventos: z.array(
          z.object({
            agente: z.string().optional(),
            data: z.string(),
            icone: z.string().optional(),
            inicia: z.date().optional(),
            localidades: z.array(z.string()).optional(),
            termina: z.date().optional(),
            texto: z.string(),
            tipo: z.enum([
              "comemorativa",
              "evento",
              "feriado",
              "fim-semestre",
              "ini-semestre",
              "matrícula",
            ]),
          }),
        ),
      }),
    }),
  },
});
