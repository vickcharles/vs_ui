import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {

  constructor(private userService: UserService, private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (!this.userService.isLoggedIn() ) {
         this.router.navigateByUrl('/home');
         this.userService.deleteToken();
         return false;

      } else {

        this.userService.getUserProfile().subscribe(res => {
            if(res['user'].role == next.data.role) {
              return true;
            } else {
              this.router.navigateByUrl('/dashboard');
              return false;
            }
        })
      }
  }
}
