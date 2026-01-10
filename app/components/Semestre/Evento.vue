<script setup>
import { DateTime, Settings } from "luxon";
import Data from "~/components/Semestre/Data.vue";
import Icone from "./Icone.vue";
import Localidade from "./Localidade.vue";

Settings.defaultLocale = "pt-BR";

const props = defineProps({
  evento: {
    type: Object,
    required: true,
  },
});

const date = computed(() => {
  return DateTime.fromISO(props.evento.data);
});

const dates = computed(() => {
  let result = {};

  for (let term of ["inicia", "termina"]) {
    if (props.evento.hasOwnProperty(term)) {
      result[term] = DateTime.fromISO(
        props.evento[term]
      );
    }
  }

  return result;
});

const inicia = computed(() => {
  if (props.evento.hasOwnProperty("inicia")) {
    return DateTime.fromISO(
      props.evento.inicia
    ).toLocaleString(DateTime.DATE_SHORT);
  }
  return "Sem início";
});

const termina = computed(() => {
  if (props.evento.hasOwnProperty("termina")) {
    return DateTime.fromISO(
      props.evento.termina
    ).toLocaleString(DateTime.DATE_SHORT);
  }
  return "Sem término";
});

const tipo = computed(() => {
  return props.evento.tipo || "evento";
});

const localidade = computed(() => {
  return props.evento.localidade || "";
});

const ator = computed(() => {
  return props.evento.ator || "todes";
});

const texto = computed(() => {
  return props.evento.texto || "Texto ausente";
});
</script>

<template>
  <div
    class="py-2 sm:py-3 lg:py-4 px-2 sm:px-4 lg:px-6 mb-4 rounded-sm border border-muted"
    vocab="http://schema.org/"
    typeof="Event"
  >
    <Data class="hidden" :date="date" />
    <div class="group relative flex flex-1 gap-3">
      <div
        class="relative flex items-end gap-1.5 flex-col"
      >
        <Icone :event="props.evento" />
        <Localidade :localidade="localidade" />
      </div>
      <div class="w-full pb-6.5">
        <h5 class="font-bold" property="about">
          {{ texto }}
        </h5>
        <Data
          :date="evento.inicia"
          label="Prazo inicial"
          v-if="evento.inicia"
        />
        <Data
          :date="evento.termina"
          label="Prazo final"
          property="endDate"
          v-if="evento.termina"
        />
        <p>{{ ator }}</p>
      </div>
    </div>
  </div>
</template>
