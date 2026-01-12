<script setup>
import { DateTime, Settings } from "luxon";
import Evento from "~/components/Semestre/Evento.vue";

Settings.defaultLocale = "pt-BR";

const props = defineProps({
  ano: {
    type: [String, Number],
    required: true,
  },
  mes: {
    type: [String, Number],
    required: true,
  },
  dia: {
    type: [String, Number],
    required: true,
  },
  eventos: {
    type: Array,
    required: true,
  },
});

const date = computed(() => {
  return DateTime.fromObject({
    year: Number(props.ano),
    month: Number(props.mes) + 1,
    day: Number(props.dia) + 1,
  });
});

const date_huge = computed(() => {
  return date.value.toLocaleString(
    DateTime.DATE_HUGE
  );
});
</script>

<template>
  <h4>{{ date_huge }}</h4>
  <ul>
    <li
      v-for="(evento, index) in eventos"
      :key="index"
    >
      <Evento :evento="evento" />
    </li>
  </ul>
</template>
