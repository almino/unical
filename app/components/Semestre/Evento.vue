<script setup>
import { DateTime, Settings } from "luxon";
import Data from "~/components/Semestre/Data.vue";
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
  return props.evento.localidade || "todas";
});

const ator = computed(() => {
  return props.evento.ator || "todes";
});

const texto = computed(() => {
  return props.evento.texto || "Texto ausente";
});
</script>

<template>
  <div vocab="http://schema.org/" typeof="Event">
    <h5 property="about">{{ texto }}</h5>
    <Data :data="evento.inicia" />
    <Data
      :data="evento.termina"
      property="endDate"
    />
    <p>{{ tipo }}</p>
    <Localidade :localidade="localidade" />
    <p>{{ ator }}</p>
  </div>
</template>
