import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { API_URL } from 'src/app/core/constants/api.constant';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  posts: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(`${API_URL}/track`).subscribe({
      next: (res) => {
        console.log(res);
      },
    });
  }
}
