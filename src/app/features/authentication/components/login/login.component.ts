// @ts-ignore
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnotifyService } from 'ng-snotify';
import { TranslateService } from '@ngx-translate/core';

/*import {userInfo} from "os";*/

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  /*Properties*/
  loading = false;
  selectedLangugae = '';
  private index = 0;

  token = sessionStorage.getItem("token");
  constructor(public authService: AuthService, private router: Router,
    private cookieService: CookieService, private toastr: ToastrService,
    private spinner: NgxSpinnerService, private snotifyService: SnotifyService,
    private translate: TranslateService) {

    // let lang: any = cookieService.get('language')
    // this.selectedLangugae = lang;
    // if (cookieService.get('language')) {
    //   translate.setDefaultLang(lang);
    //   translate.use(lang);
    // } else {
    //   translate.setDefaultLang('en');
    //   translate.use('en');
    //   cookieService.set('language', 'en');
    // }
  }

  ngOnInit(): void {
    if (this.token) {
      // this.router.navigateByUrl('/db')
    }

  }

  signIn(email: string, pass: string): void {
    
    // this.loading = true;
    const data = {
      userName: email,
      password: pass
    };

    if (data.userName === '' || data.password === '') {
        return;
      // this.loading = false;
      // this.snotifyService.warning(this.translate.instant('Username & Password cannot be empty'), '', { /* Please enter your username and password */
      //   timeout: 2000,
      //   showProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true
      // }
      // );
    } else {
      this.authService.logIn(data).subscribe(response => {
        
        if (response.isValid === true) {
          sessionStorage.setItem('token', response.token);
          this.cookieService.set('userId', response.id);
          this.router.navigateByUrl('/');
        } else {
          // this.loading = false;
          this.snotifyService.error(this.translate.instant('Invaild Usename or Password'), '', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true
          });
        }
      }, error => {

      });
    
    }
  }
}
