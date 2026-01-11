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
        semestre: z.string(),
        nivel: z.enum(["grad", "pos"]),
        url: z.string().url().optional(),
        oficios: z.array(z.string()).optional(),
        dias_letivos: z.number().optional(),
        ini: z.date(),
        fim: z.date().optional(),
        eventos: z.array(
          z.object({
            data: z.string(),
            inicia: z.date().optional(),
            termina: z.date().optional(),
            tipo: z.enum([
              "comemorativa",
              "evento",
              "feriado",
            ]),
            texto: z.string(),
            agente: z.string().optional(),
            icone: z.string().optional(),
          })
        ),
      }),
    }),
  },
});
