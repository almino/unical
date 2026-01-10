<script setup>
import Dia from "~/components/Semestre/Dia.vue";

const props = defineProps({
  ano: {
    type: [String, Number],
    required: true,
  },
  mes: {
    type: [String, Number],
    required: true,
  },
  dias: {
    type: Array,
    required: true,
  },
});

const nomesMeses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const nomeMes = computed(
  () => nomesMeses[props.mes]
);
</script>

<template>
  <div>
    <h3>{{ nomeMes }} de {{ props.ano }}</h3>
    <ul>
      <li v-for="(eventos, dia) in dias" :key="dia">
        <Dia
          :ano="props.ano"
          :mes="props.mes"
          :dia="dia"
          :eventos="eventos"
        />
      </li>
    </ul>
  </div>
</template>
