<script setup>
const props = defineProps({
  hoje: {
    type: String,
    required: true,
  },
});

const items = computed(() => [
  {
    label: "Hoje",
    icon: "streamline:calendar-star-solid",
    to: `#${props.hoje}`,
    disabled: !props.hoje,
  },
]);
</script>

<template>
  <UNavigationMenu class="justify-end" :items="items" />
</template>
