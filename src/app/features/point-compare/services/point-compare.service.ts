import { Injectable } from '@angular/core';
import { ApiEndpoints } from 'src/app/core/config';
import { HttpService } from './../../../core/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class PointCompareService {

  public readonly reportsApiEndPoints = ApiEndpoints.WaterFlow; 
  
  propertyValues : string[] = 
   ['Battery Voltage', 'Freshwater Electrical Conductivity', 'Water Quantity', 'Water Level', 'Turbidity', 'Saltwater Conductivity', 'Water Temperature']

  constructor( private httpService : HttpService ) { }

  
}
