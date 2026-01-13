import { DateTime, Settings } from "luxon";

Settings.defaultLocale = "pt-BR";

// It will be available as randomEntry() (camelCase of file name without extension)
export default function (semestres) {
  const eventos = [];

  semestres.forEach((semestre, si) => {
    const info_semestre = {
      nome: semestre.nome,
      nivel: semestre.nivel,
      oficios: semestre.oficios,
      url: semestre.url,
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

      // Adiciona evento com informações do semestre
      const evento_tratado = {
        ...evento,
        semestre: info_semestre,
        date: date,
        dates: {},
        is_finished: false,
        is_past: date < DateTime.now(),
        is_today: date.hasSame(DateTime.now(), "day"),
        key: `${evento.data}_${si}-${ei}`,
      };

      for (let term of ["inicia", "termina"]) {
        if (evento.hasOwnProperty(term)) {
          evento_tratado.dates[term] = DateTime.fromISO(evento[term]);
        }
      }

      if (evento_tratado.dates.hasOwnProperty("termina")) {
        evento_tratado.is_finished =
          evento_tratado.dates.termina > DateTime.now();
      }

      eventos.push(evento_tratado);
    });
  });
  // Ordena desordenados pela data
  // console.debug(eventos);
  eventos.sort((a, b) => a.date - b.date);
  return eventos;
}
