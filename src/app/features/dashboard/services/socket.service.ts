import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client/build/index';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket: any = '';
  readonly uri: string = 'https://iothubadmin-iothubapis.azurewebsites.net/api/Light/GetLightDataByPage';
  constructor(private http: HttpClient) {
    
    this.socket = io(this.uri);
    this.socket.io.post('https://iothubadmin-iothubapis.azurewebsites.net/api/Light/GetLightDataByPage', { page: 0, id: 1 }, function (resData: any, jwRes: any) {
      jwRes.statusCode; // => 200
    });
  }

  listen(eventName: string) {
    
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data);
      })
    });
  }
  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  getAllData(data: any) {
    
    return this.http.post(`https://iothubadmin-iothubapis.azurewebsites.net/api/Light/GetLightDataByPage`, data);
  }
}


