<script setup>
import { DateTime, Settings } from "luxon";

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
  <h5>{{ texto }}</h5>
  <dl>
    <dt>Inicia</dt>
    <dd>{{ inicia }}</dd>
    <dt>Termina</dt>
    <dd>{{ termina }}</dd>
    <dt>Tipo</dt>
    <dd>{{ tipo }}</dd>
    <dt>Localidade</dt>
    <dd>{{ localidade }}</dd>
    <dt>Ator</dt>
    <dd>{{ ator }}</dd>
  </dl>
</template>
