const Languages = {
  en: "en",
  pt_br: "pt_br",
};
export default Languages;

export class Language {
  private name!: string;
  private namespace!: string;
  private icon!: string;

  constructor(name: string, namespace: string, icon: string) {
    this.name = name;
    this.namespace = namespace;
    this.icon = icon;
  }

  getName(): string {
    return this.name;
  }

  getNamespace(): string {
    return this.namespace;
  }

  getIcon(): string {
    return this.icon;
  }
}
