import Languages, { Language } from "./languages";

export default class LanguageManager {
  private static instance: LanguageManager;
  private availableLanguages = new Map<string, Language>();

  private pt_br = new Language(Languages.pt_br, "pt_br-flag");
  private en = new Language(Languages.en, "en-flag");

  private constructor() {
    this.availableLanguages.set(Languages.en, this.en);
    this.availableLanguages.set(Languages.pt_br, this.pt_br);
  }

  public static getInstance(): LanguageManager {
    if (!LanguageManager.instance) {
      LanguageManager.instance = new LanguageManager();
    }

    return LanguageManager.instance;
  }

  getDefaultLanguage(): Language {
    return this.pt_br;
  }

  getByNamespace(namespace: string): Language | undefined {
    return this.availableLanguages.get(namespace);
  }
}
