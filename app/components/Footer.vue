<script setup lang="ts">
const appConfig = useAppConfig();
</script>

<template>
  <UFooter>
    <template #default>
      <div vocab="https://schema.org/" typeof="WPFooter">
        <span property="text">
          Feito com
          <a
            href="https://nuxt.com"
            property="url"
            typeof="SoftwareApplication"
          >
            <UIcon name="logos:nuxt" class="inline-block mx-2" />
            <span class="hidden" property="name">Nuxt</span>
          </a>
          por
          <span typeof="SoftwareSourceCode">
            <span class="hidden" property="name">UniCal</span>
            <UButton
              icon="i-simple-icons-github"
              color="neutral"
              variant="ghost"
              :to="appConfig.git"
              target="_blank"
              aria-label="GitHub"
              property="codeRepository"
            />
          </span>
          <span typeof="Person" property="author">
            <ULink to="https://almino.dev.br" property="url">
              <span property="name">Almino Melo</span>
            </ULink>
          </span>
        </span>
      </div>
    </template>
  </UFooter>
</template>
