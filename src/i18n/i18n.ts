import i18next from "i18next";
import moment from "moment";

import { PT_BR } from "./translations/pt-BR/pt_br";
import { EN } from "./translations/en/en";
import { Language } from "./languages";

export async function init(language: Language): Promise<void> {
  await i18next.init({
    lng: language.getNamespace(), // if you're using a language detector, do not define the lng option
    compatibilityJSON: "v3",
    debug: false,
    resources: {
      en: {
        translation: EN,
      },
      pt_br: {
        translation: PT_BR,
      },
    },
    interpolation: {
      formatSeparator: ",",
      format: function (value, formatting, lng) {
        if (value instanceof Date) return moment(value).format(formatting);
        return value.toString();
      },
    },
  });
}
