import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');

     // decode the token to get its payload
     const tokenPayload = decode(token);

      if(!this.userService.isLoggedIn()) {
        this.router.navigateByUrl('/home');
        this.userService.deleteToken();
        return false;
      } else if(this.userService.isLoggedIn() && tokenPayload.role == 'ADMIN') {
        this.router.navigateByUrl('/dashboard/admin');
        return false;
      }
      return true;
  }
}
