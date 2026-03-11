<script setup lang="ts">
const appConfig = useAppConfig();

// queryCollectionNavigation só funciona com coleções do tipo "page".
// "semestres" é do tipo "data", então usamos queryCollection diretamente.
const { data: semestres } = await useAsyncData("header-semestres", () => {
  return queryCollection("semestres")
    .select("stem", "nome")
    .order("nome", "DESC")
    .all();
});

// Converte para o formato de items do UNavigationMenu
const semestresItems = computed(() =>
  (semestres.value ?? []).map((s) => ({
    label: s.nome,
    // stem é algo como "semestres/2026.1"
    // A rota é /semestre/2026.1
    to: `/semestre/${s.stem.replace("semestres/", "")}`,
  })),
);
</script>

<template>
  <UHeader mode="drawer">
    <template #title>
      <div class="flex gap-2 items-baseline">
        <span>{{ appConfig.title }}</span>
        <span class="inline text-xs text-muted font-thin">{{
          appConfig.subtitle
        }}</span>
      </div>
    </template>

    <template #right>
      <!-- Menu de semestres -->
      <UDropdownMenu :items="semestresItems">
        <UButton
          color="neutral"
          variant="ghost"
          icon="streamline:interface-calendar-mark-calendar-date-day-month-mark"
          trailing-icon="i-lucide-chevron-down"
          aria-label="Semestres"
          label="Semestres"
        />
      </UDropdownMenu>

      <!-- Botão de alternância light/dark -->
      <UColorModeButton />

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
