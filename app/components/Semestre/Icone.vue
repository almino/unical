<script lang="ts" setup>
const props = defineProps({
  color: {
    type: String,
    required: false,
  },
  event: {
    type: Object,
    required: true,
  },
});

const icon = computed(() => {
  if (props.event.icone) {
    return props.event.icone;
  }

  if (
    !props.event.icone &&
    (!props.event.tipo ||
      props.event.tipo === "evento") &&
    props.event.termina
  ) {
    return "streamline:interface-calendar-download-arrow-calendar-date-day-down-download-month";
  }

  switch (props.event.tipo) {
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
    color = props.event.tipo || "evento";
  }

  return `bg-${color} inline-flex items-center justify-center shrink-0 select-none rounded-full align-middle size-8 text-base`;
});
</script>

<template>
  <div :class="klass">
    <UIcon :name="icon" />
  </div>
</template>
