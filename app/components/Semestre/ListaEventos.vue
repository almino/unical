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
  <div
    v-for="(meses, ano) in props.eventos"
    :key="ano"
    class="ano border-b-2 border-primary last:border-none"
  >
    <h2 class="font-bold font-serif mt-4 text-2xl">Ano de {{ ano }}</h2>
    <Mes
      v-for="(dias, mes) in meses"
      :key="`${ano}-${mes}`"
      :ano="ano"
      :mes="mes"
      :dias="dias"
    />
  </div>
</template>

<style lang="css" scoped>
.ano:first-of-type > h2 {
  margin-top: 0;
}
</style>
