import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     
    if (!this.authService.isAuthenticated()) {
      const queryParams: any = {
        redirectUrl: state.url
      };

      this.authService.clearStorage();
      this.router.navigate(['login'], { queryParams: queryParams });
      return false;
    }
    
    return true;

    // ===================================

    // const token = sessionStorage.getItem("token"); 
    // if (token =='') {  return this.router.navigateByUrl('/auth') } else if(token == null){
    //    return this.router.navigateByUrl('/auth')
    // }
    // else{
    // return true;
    // }
  }

}
