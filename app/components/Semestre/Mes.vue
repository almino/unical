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
    type: Object,
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

const nomeMes = computed(() => nomesMeses[props.mes]);
</script>

<template>
  <div
    class="mb-4 mes border-b-2 border-dashed border-primary last:border-none"
  >
    <h3 class="font-bold font-serif text-xl">
      {{ nomeMes }} de {{ props.ano }}
    </h3>
    <ul>
      <li v-for="(eventos, dia) in dias" :key="dia">
        <Dia :ano="props.ano" :mes="props.mes" :dia="dia" :eventos="eventos" />
      </li>
    </ul>
  </div>
</template>
