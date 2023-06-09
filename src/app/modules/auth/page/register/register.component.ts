import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/core/constants/api.constant';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
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
    this.http
      .post(`${API_URL}/auth/send-verification-email`, { email })
      .subscribe({
        next: (res: any) => {
          if (res.statusCode === 200) {
            this.router.navigate(['/auth/sent-email']);
          }
          this.toastService.success(' ایمیل با موفقیت ارسال شد 😉');
          this.isLoading = false;
        },
        error: (err) => {
          this.toastService.error(err.message);
          this.isLoading = false;
        },
      });
  }
}
