<script setup>
import { DateTime, Settings } from "luxon";

Settings.defaultLocale = "pt-BR";

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  texto: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <UBadge>
    <UIcon :name="icon" />
    <slot>{{ props.texto }}</slot>
  </UBadge>
</template>
