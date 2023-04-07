export abstract class BaseEntity {
  constructor() {}

  toJson(): string {
    return JSON.stringify(this);
  }

  static toNull(): null {
    return null;
  }

  parseJson(json: string | null): this | null {
    if (!json || json.length == 0) return BaseEntity.toNull();

    return Object.assign(this, JSON.parse(json));
  }
}
