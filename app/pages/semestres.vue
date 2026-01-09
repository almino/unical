<script lang="ts" setup>
const { data: semestres } = await useAsyncData('semestres', () => {
  return queryCollection('semestres')
    .order('semestre', 'DESC')
    .all()
})
</script>

<template>
  {{ semestres }}
  <p>teste</p>
</template>
