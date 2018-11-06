import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserService } from './service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private auth: AuthService,private user:UserService, private router:Router){

  }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return this.user.userDetails.pipe(map(data=>{
        if(data) return true
        else{
          this.router.navigate(['login'])
          return false
        }
          
      }))
      
      

    }
}