import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpClient,
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { LocalStorageService } from 'src/app/data/service/localstorage.service';
import { API_URL } from '../constants/api.constant';
import { Router } from '@angular/router';
import { UserService } from 'src/app/data/service/user.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  isRefreshingToken = false;
  constructor(
    private lstorage: LocalStorageService,
    private http: HttpClient,
    private router: Router,
    private user: UserService,
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      withCredentials: true,
    });
    const token = this.lstorage.getItem('access-token');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401) {
          return this.handle401Error(request, next);
        } else {
          return throwError(error);
        }
      }),
    );
  }
  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      // call the refresh token endpoint to get a new access token
      return this.http.post(`${API_URL}/auth/refresh-tokens`, {}).pipe(
        switchMap((res: any) => {
          const token = res.access_token.token;
          const user = res.user;
          this.isRefreshingToken = false;
          this.user.saveUser(user);
          this.lstorage.setItem('access-token', token);
          // clone the original request and set the new access token in the header
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
          // send the cloned, modified request to the next handler
          return next.handle(request);
        }),
        catchError((error) => {
          this.isRefreshingToken = false;
          this.lstorage.removeItem('access-token');
          // if refresh token failed, redirect to login page
          this.router.navigate(['/auth/login']);
          return throwError(error);
        }),
      );
    } else {
      return next.handle(request);
    }
  }
}
