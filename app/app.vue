<template>
  <NuxtRouteAnnouncer />
  <UApp>
    <UHeader />
    <UMain>
      <NuxtLayout>
        <UContainer class="py-2 sm:py-4 lg:py-6">
          <NuxtPage />
        </UContainer>
      </NuxtLayout>
    </UMain>
    <UFooter>
      <template #default>
        Feito por <UButton
          icon="i-simple-icons-github"
          color="neutral"
          variant="ghost"
          to="https://github.com/almino/unical"
          target="_blank"
          aria-label="GitHub"
        /> Almino Melo
      </template>
    </UFooter>
  </UApp>
</template>
