<script lang="ts" setup>
import { DateTime, Settings } from "luxon";

Settings.defaultLocale = "pt-BR";

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
        (current_event: any) => ({
          ...current_event,
          data: DateTime.fromISO(
            current_event.data
          ),
          termina: DateTime.fromISO(
            current_event.termina
          ),
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

const get_icon = (event) => {
  if (event.icone) {
    return event.icone;
  }

  if (
    !event.icone &&
    (!event.tipo || event.tipo === "evento") &&
    event.termina
  ) {
    return "streamline:interface-calendar-download-arrow-calendar-date-day-down-download-month";
  }

  switch (event.tipo) {
    case "comemorativa":
      return "streamline:star-badge-remix";
    case "feriado":
      // return "streamline:travel-airport-baggage-check-baggage-travel-adventure-luggage-bag-checked";
      return "streamline:beach-solid";
    default:
      return "streamline:calendar-jump-to-date-solid";
  }
};

const items = computed(() => {
  return eventos.value.map((evento: any) => ({
    date: evento.data.toLocaleString(
      DateTime.DATE_HUGE
    ),
    title: evento.texto,
    icon: get_icon(evento),
  }));
});
</script>

<template>
  <UTimeline :items="items" size="xl" />
</template>
