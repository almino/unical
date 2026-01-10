<script setup>
import { DateTime, Settings } from "luxon";

Settings.defaultLocale = "pt-BR";

const props = defineProps({
  localidade: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <p property="location" typeof="PostalAddress">
    <span property="addressLocality">{{
      localidade
    }}</span>
    <span class="display-hidden"
      >, <span property="addressRegion"
        >Ceará</span
      ></span
    >
  </p>
</template>
