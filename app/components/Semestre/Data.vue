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
  icon: {
    type: String,
    required: false,
  },
  label: {
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
      props.localeString = "DATE_" + props.localeString;
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

const parse_icon = computed(() => {
  // if (typeof props.icon !== undefined) {
  //   return props.icon;
  // }

  switch (props.property) {
    case "startDate":
      return "streamline:interface-calendar-check-approve-calendar-check-date-day-month-success";
    case "endDate":
      return "streamline:interface-calendar-block-block-calendar-date-day-month";
    default:
      return "streamline:interface-calendar-mark-calendar-date-day-month-mark";
  }
});

const klass = computed(() => {
  let klasses = ["rounded-sm", 'py-1', 'px-2', "relative", "flex", "items-center", "gap-2"];
  const opacity = 10;

  switch (props.property) {
    case "startDate":
      klasses.push(`bg-primary/${opacity}`);
      break;
    case "endDate":
      klasses.push(`bg-error/${opacity}`);
      break;
  }

  return klasses.join(" ");
});
</script>

<template>
  <div :class="klass">
    <UIcon :name="parse_icon" class="w-4 h-4 shrink-0" />
    <div>
      <p class="font-medium text-highlighted text-sm">
        <time
          slot="name"
          :datetime="content"
          :property="property"
          :content="content"
          >{{ human }}</time
        >
      </p>
      <p class="text-muted text-xs">{{ label }}</p>
    </div>
  </div>
</template>
