import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  get(id: string) {
    return id;
  }

  create(username: string) {
    return username;
  }

  update(id: string, username: string) {
    return id + ' ' + username;
  }

  delete(id: string) {
    return id;
  }
}
