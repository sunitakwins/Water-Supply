import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpoints } from 'src/app/core/config';
import { MaintanenceResponseModel, WaterFlowRequestModel, WaterFlowResponseModel } from 'src/app/core/models';
import { AlarmSettingResponseModel } from 'src/app/core/models/point-detail';
import { HttpService } from 'src/app/core/services';
import { TranslateService } from '@ngx-translate/core';
import { Color } from 'ng2-charts';

@Injectable({
  providedIn: 'root'
})
export class PointDetailService {

  public readonly apiEndPoints = ApiEndpoints.Maintenance; 
  public readonly reportsApiEndPoints = ApiEndpoints.WaterFlow; 
  public readonly thresholdApiEndPoints = ApiEndpoints.ThresholdValues; 
  
 
  lineChartColors: Color[] = [
    {
      borderColor: '#7a7afb',
      backgroundColor : '#7a7afb'
    },
    {
      borderColor: '#fc6f8f',
      backgroundColor : '#fc6f8f'
    },
    {
      borderColor: '#40ccbd',
      backgroundColor : '#40ccbd'
    },
    {
      borderColor: '#a12727',
      backgroundColor : '#a12727'
    },
    {
      borderColor: '#bd8432',
      backgroundColor : '#bd8432'
    },
    {
      borderColor: '#4e82ae',
      backgroundColor : '#4e82ae'
    },
    {
      borderColor: 'white',
      backgroundColor : '#7c6efb'
    },
  ];


  constructor( private httpService : HttpService, private translateService : TranslateService ) { }


 // to get graph and list data
  waterFlowDataBySensorIdDates(data : WaterFlowRequestModel): Observable<WaterFlowResponseModel>{
    const params = new HttpParams()
    .set('mainSensorId',`${data.mainSensorId}`)
    .set('fromDate', `${data.fromDate}`)
    .set('toDate',`${data.toDate}`)
    return this.httpService.get<WaterFlowResponseModel>(this.reportsApiEndPoints.waterFlowListByDatesSensorId, {params});
  }

// Maintanence Tab
  getMaintanenceDetails(id : string): Observable<any>{
    const params = new HttpParams()
    .set('mainSensorId',`${id}`)
      return this.httpService.get<MaintanenceResponseModel>(this.apiEndPoints.MaintenanceDeatilsByMainSensorId, {params});
  }

  // Alarm Setting Tab
  getAlamSettingDetails(id : string) : Observable<any>{
    const params = new HttpParams()
    .set('mainSensorId',`${id}`)
    return this.httpService.get<AlarmSettingResponseModel>(this.thresholdApiEndPoints.ThresholdValuesByMainSensorId, {params})
  }


  
}
