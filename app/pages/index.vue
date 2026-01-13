<script setup>
import { DateTime, Settings } from "luxon";
import Container from "~/components/Semestre/Container.vue";
import ListaEventos from "~/components/Semestre/ListaEventos.vue";
import Nav from "~/components/Semestre/Nav.vue";
import agrupar_eventos from "~/utils/agrupar_eventos";
import evento_inclui_semestre from "~/utils/evento_inclui_semestre";
import eventos_hoje from "~/utils/eventos_hoje";

Settings.defaultLocale = "pt-BR";

const { data: semestres } = await useAsyncData("semestres", () => {
  return queryCollection("semestres")
    .orWhere((q) =>
      q.where("fim", ">", DateTime.now().toISO()).where("fim", "IS NULL")
    )
    .order("fim", "DESC")
    .all();
});

const eventos = computed(() => {
  return evento_inclui_semestre(semestres.value || []);
});

const today = computed(() => {
  const hoje = eventos_hoje(eventos.value);
  console.debug("hoje =", hoje);
  return hoje;
});

const eventos_agrupados = computed(() => {
  return agrupar_eventos(eventos.value);
});
</script>

<template>
  <Container>
    <Nav :hoje="today" />
    <ListaEventos :eventos="eventos_agrupados" />
  </Container>
</template>
