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
        ini: z.date(),
        fim: z.date(),
        eventos: z.array(
          z.object({
            data: z.string(),
            inicia: z.date().optional(),
            termina: z.date().optional(),
            tipo: z
              .enum([
                "comemorativa",
                "evento",
                "feriado",
              ])
              .default("evento"),
            texto: z.string(),
            icone: z.string().optional(),
          })
        ),
      }),
    }),
  },
});
