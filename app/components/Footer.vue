<script setup lang="ts">
const appConfig = useAppConfig();
</script>

<template>
  <UFooter>
    <template #default>
      Feito com <a href="http://nuxt.com">
        <UIcon name="logos:nuxt" class="inline-block mx-2" />
      </a>
      por
      <UButton
        icon="i-simple-icons-github"
        color="neutral"
        variant="ghost"
        :to="appConfig.git"
        target="_blank"
        aria-label="GitHub"
      />
      Almino Melo
    </template>
  </UFooter>
</template>
