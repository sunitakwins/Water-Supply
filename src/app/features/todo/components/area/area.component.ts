import { Component, OnInit, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {
 
  selectedCity = 'Name';
  selectedCityId: any = 0;
  cityArray : any =[];
  areaNameArray:any = []
  loginVisibility: any;
  registerVisibility : any

  
  constructor( public todoService: TodoService, private cookieService: CookieService,private translate: TranslateService) {
    
   }

  ngOnInit(): void {

    const userId = this.cookieService.get('userId');
    this.getAllUserCities(userId);
    this.getAllAreas();
 this.cityArray = this.todoService.getSelectedCity();
 this.cityArray = this.todoService.getSelectedCityID();
  }
  


getAllUserCities(userId: any): void {


    this.todoService.getCityByUserId(userId).subscribe((response: any) => {
        this.cityArray = response;
        sessionStorage.setItem('userCities', JSON.stringify(this.cityArray));
      },
      
      error => {

      });
    
     
  }
  async getAllAreas(): Promise<void> {
    const areasArray = await this.todoService.getAllCityAreas().toPromise();
    sessionStorage.setItem('allAreas', JSON.stringify(areasArray));
  }


  handleCitySelection(cityData: any): any {

   this.todoService.setMenu(cityData.id);
    this.todoService.setSelectedCity(cityData.cityname, cityData.cityid);
    // sessionStorage.setItem('Area' ,cityData.cityname)
    this.todoService.sendClickEvent();
  }

}
