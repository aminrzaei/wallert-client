import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { API_URL } from 'src/app/core/constants/api.constant';
import { LocalStorageService } from 'src/app/data/service/localstorage.service';
import { UserService } from 'src/app/data/service/user.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
})
export class MainLayoutComponent {
  isOpen = false;

  constructor(
    private http: HttpClient,
    private user: UserService,
    private lstrage: LocalStorageService,
    private router: Router,
  ) {}
  toggleOpen(): void {
    this.isOpen = !this.isOpen;
  }

  logOut(): void {
    this.http.post(`${API_URL}/auth/logout`, {}).subscribe({
      next: (res) => {
        this.user.saveUser({
          id: -1,
          name: '',
          email: '',
        });
        this.lstrage.removeItem('access-token');
        this.router.navigate(['/auth/login']);
      },
    });
  }
}
