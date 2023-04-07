import { BaseEntity } from "../../@entity/BaseEntity";

export default class User extends BaseEntity {
  private name!: string;
  private email!: string;

  getName(): string {
    return this.name;
  }

  setName(name: string) {
    this.name = name;
  }

  getEmail(): string {
    return this.email;
  }

  setEmail(email: string) {
    this.email = email;
  }
}

export class UserBuilder {
  private name: string;
  private email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }

  build(): User {
    const user = new User();

    user.setName(this.name);
    user.setEmail(this.email);

    return user;
  }
}
