import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EcommService {

  private apiURL = "http://localhost:3001/api";

  httpOptions = {

    headers: new HttpHeaders({

      'Content-Type': 'application/json'

    })

  }

  constructor(private httpClient: HttpClient) { }
  sendPayment(data:any): Observable<any> {


    return this.httpClient.post(this.apiURL + '/payment/', JSON.stringify(data), this.httpOptions)

  }
}

