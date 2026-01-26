<script setup>
import Mes from "~/components/Semestre/Mes.vue";

const props = defineProps({
  eventos: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div v-for="(meses, ano) in props.eventos" :key="ano" class="ano">
    <h2 class="font-serif font-bold text-2xl">Ano de {{ ano }}</h2>
    <Mes
      v-for="(dias, mes) in meses"
      :key="`${ano}-${mes}`"
      :ano="ano"
      :mes="mes"
      :dias="dias"
    />
  </div>
</template>
