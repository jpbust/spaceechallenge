import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class FetchImagesService {
  private apiUrl = 'http://localhost:3000/images'

  constructor(private http:HttpClient) { }

  // getImages() {
  //   console.log('getImage run')
  //   return this.http.get(this.apiUrl)

  // }

  // return this.fetching.get(this.apiUrl)

}
