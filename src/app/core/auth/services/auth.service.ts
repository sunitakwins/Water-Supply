import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseurl = 'https://d1rh4b0dx4fns2.cloudfront.net/api/User/LoginUser';
  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');
   
  constructor(public http: HttpClient) { 
  
  }
  logout(userName: string): Observable<any> {
    return this.logout(userName);
  }

  logIn(data: any): Observable<any> {    
    return this.http.post<any>(this.baseurl, data);
  }




}
