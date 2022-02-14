import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpoints } from 'src/app/core/config';
import { HttpService } from 'src/app/core/services';
import { LoginRequest, LoginResponseModel } from 'src/app/core/models';
import { map } from 'rxjs/operators';
import { AuthService } from './../../../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public readonly authEndPoints = ApiEndpoints.Auth; 
     
  constructor(
    private httpService: HttpService,
    private authService: AuthService
  ) { }


  authenticate(request: LoginRequest) {
    return this.httpService.post<LoginResponseModel>(this.authEndPoints.Login, request).pipe(map(data => {
      if(data.isValid){

        // Save tokens
        this.authService.storeAuthToken(data.token);

        // Save user details
        this.authService.setUserDetails(data);

      } 
    
      // Save primary role
      // const primaryRole = data.roles.find(r => r.isPrimary)?.roleName ?? data.roles[0].roleName;
      // this.authService.storeCurrentRole(primaryRole);
      
      return data;
    }));
  }


  

}
