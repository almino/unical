<script setup>
// Este componente é um wrapper fino sobre UBadge.
// Antes, os props color e variant eram aceitos mas nunca repassados,
// então o badge ficava sempre com o visual padrão independente do tema.
const props = defineProps({
  color: {
    type: String,
    required: false,
    default: "neutral",
  },
  icon: {
    type: String,
    required: true,
  },
  texto: {
    type: String,
    required: false,
  },
  variant: {
    type: String,
    required: false,
    default: "soft", // "soft" usa bg com opacidade — funciona bem em light e dark
  },
});
</script>

<template>
  <UBadge :color="color" :variant="variant">
    <UIcon :name="icon" class="shrink-0" />
    <slot>{{ props.texto }}</slot>
  </UBadge>
</template>
