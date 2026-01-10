<script setup>
const props = defineProps({
  class: {
    type: String,
    required: false,
  },
  color: {
    type: String,
    required: false,
    default: "elevated",
  },
  icon: {
    type: String,
    required: false,
  },
  label: {
    type: String,
    required: false,
  },
  property: {
    type: String,
    required: false,
  },
  value: {
    type: String,
    required: false,
  },
});

const klass = computed(() => {
  if (props.class) {
    return props.class;
  }

  const opacity = 10;
  let klasses = [
    "flex",
    "gap-2",
    "items-center",
    "px-2",
    "py-1",
    "relative",
    "rounded-sm",
    `bg-${props.color}/${opacity}`,
  ];

  return klasses.join(" ");
});
</script>

<template>
  <div :class="klass">
    <UIcon :name="icon" class="w-4 h-4 shrink-0" />
    <div>
      <p class="font-medium text-highlighted text-sm">
        <slot>{{ value }}</slot>
      </p>
      <p class="text-muted text-xs">
        <slot name="label">{{ label }}</slot>
      </p>
    </div>
  </div>
</template>
