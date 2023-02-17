import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/core/constants/api.constant';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent implements OnInit {
  registerForm: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastService: HotToastService,
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    const email = this.registerForm.value.email;
    this.isLoading = true;
    this.http.post(`${API_URL}/auth/forgot-password`, { email }).subscribe({
      next: (res: any) => {
        if (res.statusCode === 200) {
          this.router.navigate(['/auth/sent-email']);
        }
        this.toastService.success(
          ' ایمیل تغییر رمز عبور با موفقیت ارسال شد 😉',
        );
        this.isLoading = false;
      },
      error: (err) => {
        this.toastService.error(err.message);
        this.isLoading = false;
      },
    });
  }
}
