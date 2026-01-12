<script setup>
import { DateTime, Settings } from "luxon";
import Mes from "~/components/Semestre/Mes.vue";

Settings.defaultLocale = "pt-BR";

const { data: semestres } = await useAsyncData("semestres", () => {
  return queryCollection("semestres")
    .orWhere((q) =>
      q.where("fim", ">", DateTime.now().toISO()).where("fim", "IS NULL")
    )
    .order("fim", "DESC")
    .all();
});

const today = ref(null);
const eventos_ordenados = ref([]);

// Função para agrupar eventos por ano, mês e dia
const agrupar = (semestres) => {
  const agrupado = {};
  const desordenados = [];

  semestres.forEach((semestre, si) => {
    const infoSemestre = {
      nome: semestre.nome,
      ini: semestre.ini,
      fim: semestre.fim,
      // ini: DateTime.fromISO(semestre.ini),
      // fim: DateTime.fromISO(semestre.fim),
      dias_letivos: parseInt(semestre.dias_letivos),
    };

    semestre.eventos.forEach((evento, ei) => {
      const date = DateTime.fromISO(evento.data);

      if (!date.isValid) {
        console.error(`Data inválida para o evento: ${evento.data}`);
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
      let iday = agrupado[ano][mes][dia].length;

      // Adiciona evento com informações do semestre
      let evento_tratado = {
        ...evento,
        // data: DateTime.fromISO(evento.data),
        iday: iday,
        key: `${evento.data}_${si}-${ei}`,
        date: date,
        semestre: infoSemestre,
      };
      agrupado[ano][mes][dia].push(evento_tratado);
      desordenados.push(evento_tratado);
    });
  });

  let found_today = false;
  // Ordena desordenados pela data
  desordenados.sort((a, b) => a.date - b.date);

  desordenados.forEach((evento) => {
    for (let term of ["inicia", "termina"]) {
      if (!evento.hasOwnProperty("dates")) {
        evento.dates = {};
      }

      if (evento.hasOwnProperty(term)) {
        evento.dates[term] = DateTime.fromISO(evento[term]);
      }
    }

    const is_past = evento.date < DateTime.now();
    let is_today = evento.date.hasSame(DateTime.now(), "day");

    evento.past = is_past;
    evento.today = is_today;

    console.debug("!is_past =", !is_past, "!found_today =", !found_today);
    console.debug("is_today =", is_today, evento);
    if (!is_past && !found_today) {
      console.debug(is_today, evento);
      found_today = true;
      evento.today = true;
      today.value = evento.data;
    }

    if (is_past && evento.dates.termina) {
      if (evento.dates.termina >= DateTime.now()) {
        evento.past = false;
      }
    }

    agrupado[evento.date.year][evento.date.month - 1][evento.date.day - 1][
      evento.iday
    ] = evento;
  });

  eventos_ordenados.value = desordenados;

  // console.debug(agrupado);
  return agrupado;
};

const eventos = computed(() => {
  return agrupar(semestres.value || []);
});
</script>

<template>
  <h1>{{ today }}</h1>
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
