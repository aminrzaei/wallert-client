import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { LocalStorageService } from 'src/app/data/service/localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private lstorage: LocalStorageService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.lstorage.getItem('access-token')) {
      // User is authenticated, allow access
      return true;
    }
    // User is not authenticated, redirect to login page
    this.router.navigate(['/auth/login']);
    return false;
  }
}
