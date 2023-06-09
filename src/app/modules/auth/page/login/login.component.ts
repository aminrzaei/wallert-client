import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { API_URL } from 'src/app/core/constants/api.constant';
import { LocalStorageService } from 'src/app/data/service/localstorage.service';
import { UserService } from 'src/app/data/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private user: UserService,
    private lstorage: LocalStorageService,
    private toastService: HotToastService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*?[a-zA-Z])(?=.*?[0-9]).{6,}$/),
        ],
      ],
    });
  }
  onSubmit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.isLoading = true;
    this.http.post(`${API_URL}/auth/login`, { email, password }).subscribe({
      next: (res: any) => {
        if (res.statusCode === 200) {
          const user = res.user;
          const accessToken = res.access_token.token;
          this.user.saveUser(user);
          this.lstorage.setItem('access-token', accessToken);
          this.router.navigate(['/dashboard']);
        }
        this.toastService.success(' ورود با موفقیت انجام شد 😉');
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.toastService.error('خطا در ورود ایمیل یا رمز عبور صحیح نمی باشد');
      },
    });
  }
}
