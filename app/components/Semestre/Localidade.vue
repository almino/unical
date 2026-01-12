<script setup>
const props = defineProps({
  color: {
    type: String,
    required: false,
    default: "secondary",
  },
  localidade: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <p property="location" typeof="PostalAddress" v-if="props.localidade">
    <UBadge :color="color" property="addressLocality">
      <UIcon
        name="streamline:travel-map-location-pin-navigation-map-maps-pin-gps-location"
      />
      {{ props.localidade }}</UBadge
    >
    <span class="hidden" property="addressRegion">Ceará</span>
  </p>
</template>
