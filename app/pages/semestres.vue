<script lang="ts" setup>
const { data: semestres } = await useAsyncData(
  "semestres",
  () => {
    return queryCollection("semestres")
      .order("semestre", "DESC")
      .all();
  }
);

const eventos = computed(() => {
  return semestres.value.flatMap(
    (semestre: any) => {
      return semestre.eventos.map(
        (evento: any) => ({
          ...evento,
          semestre: {
            ...semestre,
            meses_letivos: undefined,
            eventos: undefined,
          },
        })
      );
    }
  );
});

const items = computed(() => {
  return eventos.value.map((evento: any) => ({
    date: evento.data,
    title: evento.texto,
  }));
});
</script>

<template>
  <UTimeline :items="items" />
</template>
