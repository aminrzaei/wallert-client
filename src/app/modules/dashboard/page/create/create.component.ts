import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { API_URL } from 'src/app/core/constants/api.constant';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  createTrackFrom: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.createTrackFrom = this.formBuilder.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(250),
        ],
      ],
      interval: [
        10,
        [
          Validators.required,
          Validators.pattern('^(5|10|30|60|120|300|720|1440)$'),
        ],
      ],
      query: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /https:\/\/divar\.ir\/s\/[-a-zA-Z0-9@:%_\+.~#?&//=]*/i,
          ),
        ],
      ],
    });
  }

  onSubmit(): void {
    if (this.createTrackFrom.invalid) return;
    this.isLoading = true;
    const { title, interval, query } = this.createTrackFrom.value;
    this.http.post(`${API_URL}/track`, { title, interval, query }).subscribe({
      next: (res: any) => {
        this.router.navigate(['/dashboard']);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }
}
