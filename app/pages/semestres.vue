<script lang="ts" setup>
import { DateTime, Settings } from "luxon";

Settings.defaultLocale = "pt-BR";

const { data: semestres } = await useAsyncData(
  "semestres",
  () => {
    return queryCollection("semestres")
      .order("semestre", "DESC")
      .all();
  }
);

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
      dias_letivos: parseInt(
        semestre.dias_letivos
      ),
    };

    semestre.eventos.forEach(
      (evento: any, key: number) => {
        const data = DateTime.fromISO(
          evento.data
        );
        const ano = data.year;
        const mes = data.month - 1; // 0-11
        const dia = data.day;

        // if (evento.hasOwnProperty("termina")) {
        //   evento.termina = DateTime.fromISO(
        //     evento.termina
        //   );
        // }

        // if (evento.hasOwnProperty("inicia")) {
        //   evento.inicia = DateTime.fromISO(
        //     evento.inicia
        //   );
        // }

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
      }
    );
  });

  console.log(agrupado);
  return agrupado;
};

const eventos = computed(() => {
  return agrupar(semestres.value || []);
});
</script>

<template>
  <div
    v-for="(meses, ano) in eventos"
    :key="ano"
    class="ano"
  >
    <h2>Ano de {{ ano }}</h2>

    <div
      v-for="(dias, mes) in meses"
      :key="`${ano}-${mes}`"
      class="mes"
    >
      <h3>
        {{ mes }}
      </h3>

      <div
        v-for="(eventosLista, dia) in dias"
        :key="`${ano}-${mes}-${dia}`"
        class="dia"
      >
        <h4>
          {{ dia }} de
          {{ mes }}
        </h4>

        <div
          v-for="evento in eventosLista"
          :key="evento.key"
          class="evento"
        >
          <UIcon
            v-if="evento.icone"
            :name="evento.icone"
          />
          <span>{{ evento.texto }}</span>
          <span>{{ evento.tipo }}</span>
          <span>{{
            evento.semestre.semestre
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
