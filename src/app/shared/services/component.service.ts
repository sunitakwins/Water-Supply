import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpoints } from 'src/app/core/config';
import { HttpService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  public readonly cityApiEndPoints = ApiEndpoints.UserCity; 
  public readonly areaApiEndPoints = ApiEndpoints.CityArea; 
  public readonly sensorApiEndPoints = ApiEndpoints.AreaSensor;


constructor(private httpService: HttpService, private http : HttpClient) { }

getCitiesByUserId(id : number): Observable<any>{
  const params = new HttpParams()
  .set('userId',`${id}`)
    return this.httpService.get(this.cityApiEndPoints.UserCitiesList, {params});
}

getAreasByCity(id : number): Observable<any>{
  const params = new HttpParams()
  .set('cityId',`${id}`)
    return this.httpService.get(this.areaApiEndPoints.CityAreasList, {params});
}

getAreaSensorByArea(id : number) : Observable<any>{
  const params = new HttpParams()
  .set('areaId',`${id}`)
    return this.httpService.get(this.sensorApiEndPoints.AreaSensorsList, {params});
}

}
