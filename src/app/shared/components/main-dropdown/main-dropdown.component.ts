import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EventService } from 'src/app/core/services';
import { ComponentService } from '../../services/component.service';

@Component({
  selector: 'app-main-dropdown',
  templateUrl: './main-dropdown.component.html',
  styleUrls: ['./main-dropdown.component.scss']
})
export class MainDropdownComponent implements OnInit {
   
  userCities : any = []; 
  cityAreas : any =[];
  sensorListData : any =[];


  constructor( private commonService : ComponentService, private eventService : EventService) { }

  ngOnInit() {
    this.getCities();
  }

  getCities(){
   let id = +1;
    this.commonService.getCitiesByUserId(id).subscribe( cityData => {
       this.userCities = cityData;
    })
  }


  onSelection(object : any, dropdownName : string ){

   if(dropdownName == 'city'){
    let cityId = object.cityid;   this.getAreas(cityId); return;
   }else if(dropdownName == 'area') {
    let areaId = object.areaid;  this.getSensorPoints(areaId); return;
   }else{
     debugger
     this.eventService.sensorIdValue.next(object); 
     return;
   }
  }

  getAreas(id : number){
    this.commonService.getAreasByCity(id).subscribe(areaData => {
      this.cityAreas = areaData;
   })
  }


  getSensorPoints(id : number){
    this.commonService.getAreaSensorByArea(id).subscribe(sensorData => {
        this.sensorListData = sensorData;
    })
  }

}
