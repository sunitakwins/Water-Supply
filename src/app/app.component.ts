// File name app.component.ts
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DateTimeAdapter } from 'ng-pick-datetime';
import { TodoService } from './services/todo.service';
@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngxs-todo-app';
  constructor(private titleService: Title, private todoService : TodoService ) {
    this.todoService.languageData.subscribe(
      (data: any) => {
        if(data == 'jp'){
          this.titleService.setTitle('日水コン');
        }else{
          this.titleService.setTitle('Nihon Suido Consultants- WMS');
        }
      });
   
  }
 
}