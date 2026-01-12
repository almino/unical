<script lang="ts" setup>
const props = defineProps({
  color: {
    type: String,
    required: false,
  },
  evento: {
    type: Object,
    required: true,
  },
});

const icon = computed(() => {
  if (props.evento.icone) {
    return props.evento.icone;
  }

  if (
    !props.evento.icone &&
    (!props.evento.tipo ||
      props.evento.tipo === "evento") &&
    props.evento.termina
  ) {
    return "streamline:interface-calendar-download-arrow-calendar-date-day-down-download-month";
  }

  if (props.evento.inicia) {
    return "streamline:interface-calendar-upload-calendar-date-day-month-push-up-arrow-upload";
  }

  switch (props.evento.tipo) {
    case "comemorativa":
      return "streamline:star-badge-remix";
    case "feriado":
      // return "streamline:travel-airport-baggage-check-baggage-travel-adventure-luggage-bag-checked";
      return "streamline:beach-solid";
    default:
      return "streamline:calendar-jump-to-date-solid";
  }
});

const klass = computed(() => {
  let color;

  if (typeof props.color === "undefined") {
    color = props.evento.tipo || "evento";
  }

  if (props.evento.tipo === "ini-semestre") {
    color = "default";
  }

  return `bg-${color} inline-flex items-center justify-center shrink-0 select-none rounded-full align-middle size-8 text-base`;
});
</script>

<template>
  <div :class="klass">
    <UIcon :name="icon" />
  </div>
</template>
