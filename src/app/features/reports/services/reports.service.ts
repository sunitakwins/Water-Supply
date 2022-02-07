import { Injectable } from '@angular/core';
import { AnyARecord } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  formValueArray : string[] = ['Converted Value','Raw Value']

  constructor() { }
}
