import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SnotifyService, SnotifyToast } from 'ng-snotify';
import { CookieService } from 'ngx-cookie-service';
import { AuthService, EventService } from 'src/app/core/services';
import { TodoService } from 'src/app/services/todo.service';
import { MessageService } from 'src/app/shared/EventBroadcast';


@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  /*Array type properties*/
  // cityArray: any = [];
  alertsArray: any = [];

  /*Properties and methods declarations*/
  currentLanguage = 'English';
  // selectedCity = 'Name';
  // selectedCityId: any = 0;

  constructor(private cookieService: CookieService, private authService: AuthService,
    private messageService: MessageService, private eventService: EventService,
    private translate: TranslateService, private renderer: Renderer2,
    private todoService: TodoService, private snotifyService: SnotifyService) {
    // translate.setDefaultLang('en');
    const lang: any = cookieService.get('language');
    lang == 'en' ? this.currentLanguage = 'English' : this.currentLanguage = '日本語';
    if (cookieService.get('language')) {
      translate.setDefaultLang(lang);
      translate.use(lang);
    } else {
      translate.setDefaultLang('en');
      translate.use('en');
      cookieService.set('language', 'en');
    }
  }

  ngOnInit(): void {
    const userId = this.cookieService.get('userId');
    // this.getAllUserCities(userId);
    // this.getAllAreas();
    this.getAlertsHistory();
    this.translate.setDefaultLang('en');
  }

  // getAllUserCities(userId: any): void {
  //   this.todoService.getCityByUserId(userId).subscribe((response: any) => {
  //     this.cityArray = response;
  //     sessionStorage.setItem('userCities', JSON.stringify(this.cityArray));
  //   },
  //     // tslint:disable-next-line:no-shadowed-variable
  //     error => {
  //     });
  // }

  // async getAllAreas(): Promise<void> {
  //   const areasArray = await this.todoService.getAllCityAreas().toPromise();
  //   sessionStorage.setItem('allAreas', JSON.stringify(areasArray));
  // }

  getAlertsHistory(): void {
    this.todoService.getUnreadAlerts(false).subscribe((response: any) => {
      this.alertsArray = response.alertResponses;
    },
      (error: any) => {

      });
  }



  markRead(object: any) {
    this.snotifyService.confirm(this.translate.instant('Mark this notification as read?'), this.translate.instant(object.status), {
      buttons: [
        {
          text: this.translate.instant('Yes'), action: toast => {
            this.updateAlert(object, toast);
          },
        },
        {
          text: this.translate.instant('No'), action: toast => {

            this.snotifyService.remove(toast.id);
          },
        },
        {
          text: this.translate.instant('Close'),
          action: toast => {
            this.snotifyService.remove(toast.id);
          },
          bold: true
        }
      ],
      timeout: 10000,
      showProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      titleMaxLength: 50
    });
  }

  updateAlert(object: any, toast: SnotifyToast): void {
    const id = object.id;
    const request =
    {
      mainSensorId: object.mainSensorId,
      dated: object.dated,
      dataTimeStamp: object.dataTimeStamp,
      pointName: object.pointName,
      dataName: object.dataName,
      dataNameToDisplay: object.dataNameToDisplay,
      isRead: true,
      status: object.status
    };
    this.todoService.updateAlert(request, id).subscribe((response: any) => {
      const alertIndex = this.alertsArray.findIndex((x: { id: any; }) => x.id === object.id);
      this.alertsArray.splice(alertIndex, 1);
      this.snotifyService.remove(toast.id);
      this.snotifyService.success('Alert mark as read successfully', '', {
        timeout: 2000,
        showProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true
      });
    },
      // tslint:disable-next-line:no-shadowed-variable
      (error: any) => {

      });
  }

  markAllRead(): void {
    if (this.alertsArray.length > 0) {
      this.snotifyService.confirm(this.translate.instant('Mark all notifications as read?'), {
        buttons: [
          {
            text: this.translate.instant('Yes'), action: toast => {
              this.updateAllAlerts(toast);
            },
          },
          {
            text: this.translate.instant('No'), action: toast => {

              this.snotifyService.remove(toast.id);
            },
          },
          {
            text: this.translate.instant('Close'),
            action: toast => {

              this.snotifyService.remove(toast.id);
            },
            bold: true
          }
        ],
        timeout: 10000,
        showProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        titleMaxLength: 50
      });
    } else {
      return;
    }

  }

  updateAllAlerts(toast: SnotifyToast): void {
    let id: any;
    let request: any;
    this.alertsArray.map((element: any) => {
      id = element.id;
      request =
      {
        mainSensorId: element.mainSensorId,
        dated: element.dated,
        dataTimeStamp: element.dataTimeStamp,
        dataNameToDisplay: element.dataNameToDisplay,
        pointName: element.pointName,
        dataName: element.dataName,
        isRead: true,
        status: element.status
      };
      this.todoService.updateAlert(request, id).subscribe((response: any) => {
        const alertIndex = this.alertsArray.findIndex((x: { id: any; }) => x.id == id);
        this.alertsArray.splice(alertIndex, 1);
        this.snotifyService.remove(toast.id);
      },
        (error: any) => {
        });
    });

  }


  logOut() {
    this.authService.logout();
  }

  changeLanguage(selectedLanguage: string): void {
   
    this.eventService.currentLanguage.next(selectedLanguage);

    // sessionStorage.setItem('lang', selectedLanguage);
    this.currentLanguage = selectedLanguage === 'en' ? 'English' : '日本語';
    this.messageService.sendMessage(selectedLanguage);
    // this.translate.use(selectedLanguage);
    this.translate.setDefaultLang(selectedLanguage);
    this.translate.use(selectedLanguage);
    this.cookieService.set('language', selectedLanguage);
    this.todoService.setSelectedLanguage(selectedLanguage);
    this.todoService.sendLangEvent();
  }

  mobMenu(): void {
    if (this.isMobile) {
      if (document.body.classList.contains('aside-fixed')) {
        this.renderer.removeClass(document.body, 'aside-fixed');
      } else {
        this.renderer.addClass(document.body, 'aside-fixed');
      }
    } else {
      return;
    }
  }

  // handleCitySelection(cityData: any): any {
  //   this.todoService.setCurrentCity(cityData);
  //   this.selectedCity = cityData.cityname;
  //   this.selectedCityId = cityData.cityid;
  //   this.todoService.setSelectedCity(cityData.cityname, cityData.cityid);
  //   this.todoService.sendClickEvent();
  // }

  locMenu(): void {
    if (document.body.classList.contains('aside')) {
      this.renderer.removeClass(document.body, 'aside');
    } else {
      this.renderer.addClass(document.body, 'aside');
    }
  }

  get isMobile() {
    return document.body.clientWidth < 991;
  }

}
