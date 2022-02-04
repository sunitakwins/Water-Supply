import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly baseApiUrl: string = environment.baseApiUrl;
  //
  
  constructor(private httpClient: HttpClient) {
  }

  get<T>(endpoint: string, httpOptions: any){
      return this.httpClient.get<T>(`${this.baseApiUrl}/${endpoint}`, httpOptions );
  }

  post<T>(endpoint: string, payload: any): Observable<T> {
      return this.httpClient.post<any>(`${this.baseApiUrl}/${endpoint}`, payload);
  }

  put<T>(endpoint: string, payload: any): Observable<T> {
      return this.httpClient.put<T>(`${this.baseApiUrl}/${endpoint}`, payload);
  }

  delete<T>(endpoint: string, httpOptions: any) {
      return this.httpClient.delete<T>(`${this.baseApiUrl}/${endpoint}`, httpOptions);
  }

  patch<T>(endpoint: string, payload: any): Observable<T> {
      return this.httpClient.patch<T>(`${this.baseApiUrl}/${endpoint}`, payload);
  }

  // downloadGetMethod(endpoint: string): Observable<HttpResponse<Blob>> {
  //     return this.httpClient.get<Blob>(`${this.baseApiUrl}/${endpoint}`, {
  //         observe: 'response',
  //         responseType: 'blob' as 'json'
  //     })
  // }
}
