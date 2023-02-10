import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user = {
    id: -1,
    name: '',
    email: '',
  };

  saveUser(user: { id: number; name: string; email: string }): void {
    this.user = user;
  }

  getUser(): { name: string; email: string } {
    return this.user;
  }
}
