
import { Component, ComponentFactory, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '../../services/authentication.service';
import { LoginRequest } from 'src/app/core/models';
import { AuthService } from 'src/app/core/services';
import { ComponentService } from 'src/app/shared/services/component.service';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginRequest: LoginRequest = {};

  selectedLangugae: string = '';

  userCityListData = new Subject<any>();

  constructor(
    public authenticationService: AuthenticationService, 
    private router: Router,
    private authService :AuthService,
    private cookieService: CookieService,
    private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.getDefaultLanguage();
  }

  onSubmit() {
    // if (!this.loginRequest) {
    //   return;
    //   // this.loading = false;
    //   // this.snotifyService.warning(this.translate.instant('Username & Password cannot be empty'), '', { /* Please enter your username and password */
    //   //   timeout: 2000,
    //   //   showProgressBar: false,
    //   //   closeOnClick: true,
    //   //   pauseOnHover: true
    //   // }
    //   // );
    // } else {
      this.authenticationService.authenticate(this.loginRequest).subscribe(response => {
        //  this.getCityListData();
        // if (response.isValid === true) {
          // sessionStorage.setItem('token', response.token);
          // this.cookieService.set('userId', response.id);
          // this.router.navigateByUrl('/');
        // } else {
          // this.loading = false;
          // this.snotifyService.error(this.translate.instant('Invaild Usename or Password'), '', {
          //   timeout: 2000,
          //   showProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true
          // });
        // }
      }, error => {

      });
    // }
  }


  // getCityListData(){
  //   let userData = this.authService.getUserDetails();
  //   this.commonService.getCitiesByUserId(userData.id).subscribe(cityData => {
  //     this.userCities = cityData;
  //     this.userCityListData.next(cityData);
  //   })
  // }


  // to get default language
  getDefaultLanguage(){
    let lang: any = this.cookieService.get('language')
    this.selectedLangugae = lang;
    if (this.cookieService.get('language')) {
      this.translate.setDefaultLang(lang);
      this.translate.use(lang);
    } else {
      this.translate.setDefaultLang('en');
      this.translate.use('en');
      this.cookieService.set('language', 'en');
    }
  }
}
