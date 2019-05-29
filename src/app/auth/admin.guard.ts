import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {

  constructor(private userService: UserService, private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
       // this will be passed from the route config
      // on the data property
     const expectedRole = next.data.role;
     const token = localStorage.getItem('token');
     // decode the token to get its payload
     const tokenPayload = decode(token);
     console.log('role papa: '+ this.userService.selectedUser.role)

     if (
        !this.userService.isLoggedIn()
        // this.userService.selectedUser.role !== expectedRole
      ) {
        this.router.navigate(['home']);
        console.log('esta logueado' + this.userService.isLoggedIn() )
        console.log('de que tipo es' + this.userService.selectedUser.role )
        return false;
      }

      return true;

  }
}
