import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FetchImagesService {
  private apiUrl = 'http://localhost:3000/images'

  constructor(private http:HttpClient) { }

  getImages(): Observable<any> {

    let date = '2021-10-19';
    let params = new HttpParams()
      .set("date", date);
    return this.http.get<any>(this.apiUrl, {params});
  }

  selectDate(newDate:string): Observable<any> {
    let date = newDate;
    let params = new HttpParams()
      .set("date", date);
    return this.http.get<any>(this.apiUrl, {params});
  }
}
