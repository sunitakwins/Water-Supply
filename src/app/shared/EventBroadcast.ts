import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })

export class MessageService {
  private subject = new Subject<any>();
  msg = '';

  constructor(private cookieService: CookieService) {
  }
  sendMessage(message: string) {
    
    this.msg = message;
    /*this.subject.next({ text: message });*/
    /*this.subject.next({ text: message });*/
    this.subject.next(this.msg);
  }

  clearMessages() {
    this.subject.next();
  }

  onMessage(): Observable<any> {
    
    if (this.msg === ''){
      this.msg = this.cookieService.get('language');
    }
  return this.subject.asObservable();
  }
}
