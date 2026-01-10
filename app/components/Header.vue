<script setup lang="ts">
const appConfig = useAppConfig();
</script>

<template>
  <UHeader mode="drawer">
    <template #title>{{
      appConfig.title
    }}</template>
    <template #right>
      <UColorModeButton />

      <UTooltip
        text="Abrir GitHub"
        :kbds="['meta', 'G']"
      >
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
  </UHeader>
</template>
