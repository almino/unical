<script setup>
const { data: semestre } = await useAsyncData('2025.2', () => {
  return queryCollection('semestres')
    .where('stem', '=', 'semestres/2025.2')
    .first()
})
</script>

<template>
  {{ semestre }}
  <p>teste [...slug].vue</p>
</template>
