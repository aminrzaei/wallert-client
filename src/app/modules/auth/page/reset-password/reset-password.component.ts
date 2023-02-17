import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { API_URL } from 'src/app/core/constants/api.constant';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  token: string;
  completeRegisterForm: FormGroup;
  isLoading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
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
    const password = this.completeRegisterForm.value.password;
    const token = this.token;
    this.isLoading = true;
    this.http
      .post(`${API_URL}/auth/reset-password`, { password, token })
      .subscribe({
        next: (res: any) => {
          this.isLoading = false;
          this.toastService.success(' تغییر رمز عبور با موفقیت انجام شد 😉');
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          this.isLoading = false;
          this.toastService.error(err.message);
          this.toastService.error('خطا در تغییر رمز عبور ');
        },
      });
  }
}
