<script lang="ts" setup>
import { DateTime, Settings } from "luxon";
import Mes from "~/components/Semestre/Mes.vue";

Settings.defaultLocale = "pt-BR";

const { data: semestres } = await useAsyncData("semestres", () => {
  return queryCollection("semestres").order("semestre", "DESC").all();
});

// Função para agrupar eventos por ano, mês e dia
const agrupar = (semestres: any[]) => {
  const agrupado: any = {};

  semestres.forEach((semestre, index: number) => {
    const infoSemestre = {
      semestre: semestre.semestre,
      ini: semestre.ini,
      fim: semestre.fim,
      // ini: DateTime.fromISO(semestre.ini),
      // fim: DateTime.fromISO(semestre.fim),
      dias_letivos: parseInt(semestre.dias_letivos),
    };

    semestre.eventos.forEach((evento: any, key: number) => {
      const date = DateTime.fromISO(evento.data);

      if (!date.isValid) {
        console.warn(`Data inválida para o evento: ${evento.data}`);
        return;
      }

      const ano = date.year;
      const mes = date.month - 1; // 0-11
      const dia = date.day - 1; // 0-31

      // Cria estrutura hierárquica se não existir
      if (!agrupado[ano]) {
        agrupado[ano] = {};
      }
      if (!agrupado[ano][mes]) {
        agrupado[ano][mes] = {};
      }
      if (!agrupado[ano][mes][dia]) {
        agrupado[ano][mes][dia] = [];
      }

      // Adiciona evento com informações do semestre
      agrupado[ano][mes][dia].push({
        ...evento,
        // data: DateTime.fromISO(evento.data),
        key: `${evento.data}_${index}-${key}`,
        semestre: infoSemestre,
      });
    });
  });

  // console.log(agrupado);
  return agrupado;
};

const eventos = computed(() => {
  return agrupar(semestres.value || []);
});
</script>

<template>
  <div v-for="(meses, ano) in eventos" :key="ano" class="ano mx-auto max-w-xl">
    <h2>Ano de {{ ano }}</h2>

    <Mes
      v-for="(dias, mes) in meses"
      :key="`${ano}-${mes}`"
      :ano="ano"
      :mes="mes"
      :dias="dias"
    />
  </div>
</template>
