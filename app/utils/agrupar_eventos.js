import evento_inclui_semestre from "~/utils/evento_inclui_semestre.js";

// It will be available as randomEntry() (camelCase of file name without extension)
export default function (eventos) {
  const agrupado = {};

  eventos.forEach((evento, index) => {
    const date = evento.date;

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
    let evento_indexado = {
      ...evento,
      // data: DateTime.fromISO(evento.data),
      iday: iday,
      key: `${evento.data}_${index}`,
    };
    agrupado[ano][mes][dia].push(evento_indexado);
  });

  // console.debug(agrupado);
  return agrupado;
}
