<script setup lang="ts">
import Footer from "~/components/Footer.vue";
import Header from "~/components/Header.vue";
</script>

<template>
  <NuxtRouteAnnouncer />
  <UApp>
    <Header />
    <UMain>
      <UPage id="app-page">
        <NuxtLayout>
          <UContainer class="py-2 sm:py-4 lg:py-6">
            <NuxtPage />
          </UContainer>
        </NuxtLayout>
      </UPage>
    </UMain>
    <Footer />
  </UApp>
</template>
