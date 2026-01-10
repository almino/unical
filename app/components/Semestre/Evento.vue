<script setup>
import { DateTime, Settings } from "luxon";
import Agente from "~/components/Semestre/Agente.vue";
import Data from "~/components/Semestre/Data.vue";
import Icone from "./Icone.vue";
import Localidade from "./Localidade.vue";
import ExtraEsquerdo from "./ExtraEsquerdo.vue";

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
      result[term] = DateTime.fromISO(props.evento[term]);
    }
  }

  return result;
});

const is_past = computed(() => {
  const now = DateTime.now();
  return date.value < now;
});

const localidade = computed(() => {
  return props.evento.localidade || "";
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
      <div class="relative flex items-end gap-1.5 flex-col">
        <Icone :event="props.evento" />
        <ExtraEsquerdo
          v-if="is_past"
          color="neutral"
          icon="streamline:interface-time-rewind-back-return-clock-timer-countdown"
          >Passado</ExtraEsquerdo
        >
        <Localidade :localidade="localidade" />
      </div>
      <div class="w-full pb-6.5">
        <h5 class="font-bold" property="about">
          {{ texto }}
        </h5>
        <div class="flex flex-wrap justify-end gap-2 items-end">
          <Agente v-if="evento.agente">{{ evento.agente }}</Agente>
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
        </div>
      </div>
    </div>
  </div>
</template>
