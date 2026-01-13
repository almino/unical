<script setup>
import agrupar_eventos from "~/utils/agrupar_eventos";
import Container from "~/components/Semestre/Container.vue";
import evento_inclui_semestre from "~/utils/evento_inclui_semestre";
import ListaEventos from "~/components/Semestre/ListaEventos.vue";

const slug = useRoute().params.slug;

const { data: semestre } = await useAsyncData(`blog-${slug}`, () => {
  console.debug("slug", slug);
  return queryCollection("semestres")
    .where("stem", "=", `semestres/${slug}`)
    .first();
});

if (!semestre.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Página não encontrada!",
    fatal: true,
  });
}

const eventos = computed(() => {
  return evento_inclui_semestre([semestre.value]);
});

const eventos_agrupados = computed(() => {
  return agrupar_eventos(eventos.value);
});
</script>

<template>
  <Container>
    <ListaEventos :eventos="eventos_agrupados" />
  </Container>
</template>
