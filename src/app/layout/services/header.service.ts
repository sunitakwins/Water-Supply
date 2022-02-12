import { Injectable } from '@angular/core';
import { ApiEndpoints } from 'src/app/core/config';
import { HttpService } from 'src/app/core/services';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  public readonly alertsApiEndPoints = ApiEndpoints.Alerts;

  constructor(private httpService: HttpService) { }

  getUnreadAlerts(status: boolean): Observable<any> {
    const params = new HttpParams()
      .set('isRead', `${status}`)
    return this.httpService.get<any>(this.alertsApiEndPoints.allReadUnreadAlerts, { params });
  }


  logout(userName: string): Observable<any> {
    return this.logout(userName);
  }



}
