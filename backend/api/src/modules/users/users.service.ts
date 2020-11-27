import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import DataLoader from 'dataloader';
import { USERS, UserData } from '../../db';
import { UserRole } from '../../gql-types';

@Injectable()
export default class UsersService {
  idsBatcher = new DataLoader(((ids: string[]) =>
    Promise.resolve(ids.map((id) => USERS.find((v) => v.id === id)))) as any);

  all() {
    return USERS;
  }

  whereId(id: string) {
    return this.idsBatcher.load(id) as Promise<UserData>;
  }

  whereEmail(email: string) {
    return USERS.find((u) => u.email === email);
  }

  async createUser(email: string, password: string, name: string, surname = ''): Promise<UserData> {
    const newUser: UserData = {
      id: '3.' + USERS.length + 1,
      roles: [UserRole.USER],
      email,
      name,
      surname,
      pashash: await bcrypt.hash(password, 3),
      favorites: [],
      orders: [],
    };

    USERS.push(newUser);

    return newUser;
  }
}
