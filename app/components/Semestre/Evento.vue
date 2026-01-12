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

const klass = computed(() => {
  let border_color = "muted";
  let bg_color = "white";
  let klasses = [
    "py-2",
    "sm:py-3",
    "lg:py-4",
    "px-2",
    "sm:px-4",
    "lg:px-6",
    "mb-4",
    "rounded-sm",
    "border",
  ];

  if (is_past.value) {
    // klasses.push("bg-neutral-100/50");
    bg_color = "elevated";
    border_color = "neutral";
  } else if (props.evento.tipo == "ini-semestre") {
    bg_color = "primary/10";
    border_color = "primary";
  } else if (props.evento.tipo == "feriado") {
    border_color = "warning";
  }

  klasses.push(`border-${border_color}`, `bg-${bg_color}`);

  return klasses;
});
</script>

<template>
  <div :class="klass" vocab="http://schema.org/" typeof="Event">
    <Data class="hidden" :date="date" />
    <div class="group relative flex flex-1 gap-3">
      <div class="relative flex items-end gap-1.5 flex-col">
        <Icone :event="props.evento" />
        <ExtraEsquerdo
          color="neutral"
          icon="streamline:calendar-star-solid"
          variant="outline"
        >
          {{ evento.semestre.nome }}
        </ExtraEsquerdo>
        <ExtraEsquerdo
          v-if="is_past"
          color="neutral"
          icon="streamline:interface-time-rewind-back-return-clock-timer-countdown"
          >Passado</ExtraEsquerdo
        >
        <Localidade v-for="(l, i) in localidades" :localidade="l" :key="i" />
      </div>
      <div class="w-full pb-6.5">
        <MDC
          class="font-bold"
          tag="h5"
          property="about"
          :value="texto"
          unwrap="p"
        />
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
