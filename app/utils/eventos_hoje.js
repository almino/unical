import { DateTime, Settings } from "luxon";

Settings.defaultLocale = "pt-BR";

// It will be available as randomEntry() (camelCase of file name without extension)
export default function (eventos) {
  let yesterday = eventos[0]?.data || null;

  for (let i = 0; i < eventos.length; i++) {
    // console.debug("!is_past =", !evento.is_past);
    // console.debug("data =", evento.data);
    // console.debug("yesterday =", yesterday);
    if (!eventos[i].is_past) {
      console.info("Encotrei o evento de hoje:", eventos[i].data);
      break;
    }

    yesterday = eventos[i].data;
  }

  return yesterday;
}
