import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpoints } from 'src/app/core/config';
import { MaintanenceResponseModel, WaterFlowRequestModel, WaterFlowResponseModel } from 'src/app/core/models';
import { AlarmSettingResponseModel } from 'src/app/core/models/point-detail';
import { HttpService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root'
})
export class PointDetailService {

  public readonly apiEndPoints = ApiEndpoints.Maintenance; 
  public readonly reportsApiEndPoints = ApiEndpoints.WaterFlow; 
  public readonly thresholdApiEndPoints = ApiEndpoints.ThresholdValues; 
  
  
  constructor( private httpService : HttpService ) { }


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
