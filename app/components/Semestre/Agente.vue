<script setup>
import Extra from "~/components/Semestre/Extra.vue";

const props = defineProps({
  color: {
    type: String,
    required: false,
    default: "primary",
  },
  icon: {
    type: String,
    required: false,
    default: "streamline:user-multiple-group-solid",
  },
  label: {
    type: String,
    required: false,
    default: "Agentes",
  },
  property: {
    type: String,
    required: false,
  },
});

const klass = computed(() => {
  const opacity = 10;
  let klasses = [
    "flex",
    "gap-2",
    "items-center",
    "px-2",
    "py-1",
    "relative",
    "rounded-sm",
    // `bg-${props.color}/${opacity}`
    `bg-${props.color}`
  ];

  return klasses.join(" ");
});
</script>

<template>
  <Extra v-bind="props">
    <slot />
  </Extra>
</template>
