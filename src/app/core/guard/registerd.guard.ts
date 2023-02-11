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
export class RegisterdGuard implements CanActivate {
  constructor(private router: Router, private lstorage: LocalStorageService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.lstorage.getItem('access-token')) {
      // User is authenticated, redirect to dashboard
      this.router.navigate(['/dashboard']);
    }
    // User is not authenticated, allowed
    return true;
  }
}
