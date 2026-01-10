<script setup lang="ts">
const appConfig = useAppConfig();
</script>

<template>
  <UHeader mode="drawer">
    <template #title>
      <div class="flex gap-2 items-baseline">
        <span>{{ appConfig.title }}</span>
        <span class="inline text-xs text-muted font-thin">{{ appConfig.subtitle }}</span>
      </div>
    </template>
    <template #right>
      <!-- <UColorModeButton /> -->

      <UTooltip text="Abrir GitHub" :kbds="['meta', 'G']">
        <UButton
          color="neutral"
          variant="ghost"
          :to="appConfig.git"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
        />
      </UTooltip>
    </template>
    <template #toggle>&ZeroWidthSpace;</template>
  </UHeader>
</template>
