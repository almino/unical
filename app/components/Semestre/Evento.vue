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
  return props.evento.dates || {};
});

const localidades = computed(() => {
  return props.evento.localidades || [];
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

  if (props.evento.is_past) {
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

const faltam = computed(() => {
  const duration = props.evento.duration;
  let pre = "faltam";
  let valor = duration.as("days");
  let texto = valor < 2 ? "dia" : "dias";

  if (duration.as("months") >= 2) {
    valor = duration.as("months");
    texto = "meses";
  }

  if (valor < 2) pre = "falta";
  valor = Math.round(valor);

  return `${pre} ${valor} ${texto}`;
});
</script>

<template>
  <div :class="klass" vocab="http://schema.org/" typeof="Event">
    <Data class="hidden" :date="date" />
    <div class="group relative flex flex-1 gap-3">
      <div class="relative flex items-end gap-1.5 flex-col">
        <Icone :evento="props.evento" />
        <ExtraEsquerdo
          color="neutral"
          icon="streamline:calendar-star-solid"
          variant="outline"
        >
          {{ evento.semestre.nome }}
        </ExtraEsquerdo>
        <ExtraEsquerdo
          v-if="evento.is_past && !evento.is_finished"
          color="neutral"
          icon="streamline:interface-time-rewind-back-return-clock-timer-countdown"
          >Passado</ExtraEsquerdo
        >
      </div>
      <div class="w-full">
        <MDC
          class="font-bold"
          tag="h5"
          property="about"
          :value="texto"
          unwrap="p"
        />
        <div class="flex flex-wrap justify-end gap-2 items-end">
          <ExtraEsquerdo
            v-if="!evento.is_past && !evento.is_today"
            color="primary"
            icon="streamline:interface-time-sleep-nap-sleep-rest-break-clock"
            variant="outline"
            >{{ faltam }}</ExtraEsquerdo
          >
          <Localidade v-for="(l, i) in localidades" :localidade="l" :key="i" />
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
