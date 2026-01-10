<script setup>
import { DateTime, Settings } from "luxon";

Settings.defaultLocale = "pt-BR";

const props = defineProps({
  date: {
    type: [String, DateTime],
    required: true,
  },
  format: {
    type: String,
    required: false,
  },
  localeString: {
    type: String,
    required: false,
    default: "DATE_SHORT",
  },
  property: {
    type: String,
    required: false,
    default: "startDate",
  },
});

const date = computed(() => {
  return DateTime.fromISO(props.date);
});

const human = computed(() => {
  if (!props.format) {
    if (!props.localeString.startsWith("DATE")) {
      props.localeString =
        "DATE_" + props.localeString;
    }

    return date.value.toLocaleString(
      DateTime[props.localeString.toUpperCase()]
    );
  }

  return date.value.toFormat(props.format);
});

const content = computed(() => {
  return date.value.toFormat("yyyy-MM-dd");
});
</script>

<template>
  <time :datetime="content" :property="property" :content="content">
    {{ human }}
  </time>
</template>
