import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { API_URL } from 'src/app/core/constants/api.constant';
import { LocalStorageService } from 'src/app/data/service/localstorage.service';
import { UserService } from 'src/app/data/service/user.service';

@Component({
  selector: 'app-complete-register',
  templateUrl: './complete-register.component.html',
  styleUrls: ['./complete-register.component.css'],
})
export class CompleteRegisterComponent implements OnInit {
  token: string;
  completeRegisterForm: FormGroup;
  isLoading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private user: UserService,
    private lstorage: LocalStorageService,
    private toastService: HotToastService,
  ) {}
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['token']) {
        this.token = params['token'];
      } else {
        this.router.navigate(['/auth/login']);
      }
    });
    this.completeRegisterForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
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
    const name = this.completeRegisterForm.value.name;
    const password = this.completeRegisterForm.value.password;
    const token = this.token;
    this.isLoading = true;
    this.http
      .post(`${API_URL}/auth/register`, { name, password, token })
      .subscribe({
        next: (res: any) => {
          if (res.statusCode === 201) {
            const user = res.user;
            const accessToken = res.access_token.token;
            this.user.saveUser(user);
            this.lstorage.setItem('access-token', accessToken);
            this.router.navigate(['/dashboard']);
          }
          this.toastService.success(' ثبت نام با موفقیت انجام شد 😉');
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
          this.toastService.error(err.message);
        },
      });
  }
}
