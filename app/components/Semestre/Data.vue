<script setup>
import { DateTime, Settings } from "luxon";

Settings.defaultLocale = "pt-BR";

const props = defineProps({
  property: {
    type: String,
    required: false,
    default: "startDate",
  },
  data: {
    type: String,
    required: true,
  },
});

const date = computed(() => {
  return DateTime.fromISO(props.data);
});

const human = computed(() => {
  return date.value.toLocaleString(
    DateTime.DATE_SHORT
  );
});

const content = computed(() => {
  return date.value.toFormat("yyyy-MM-dd");
});
</script>

<template>
  <p :property="property" :content="data">
    {{ human }}
  </p>
</template>
