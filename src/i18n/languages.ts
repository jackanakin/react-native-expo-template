const Languages = {
  en: "en",
  pt_br: "pt_br",
};
export default Languages;

export class Language {
  private namespace!: string;
  private icon!: string;

  constructor(namespace: string, icon: string) {
    this.namespace = namespace;
    this.icon = icon;
  }

  getNamespace(): string {
    return this.namespace;
  }

  getIcon(): string {
    return this.icon;
  }
}
