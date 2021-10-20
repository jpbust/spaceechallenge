import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IMAGES} from '../mock-images'

@Injectable({
  providedIn: 'root'
})
export class FetchImagesService {
  private apiUrl = 'http://localhost:3000/images'

  constructor(private http:HttpClient) { }

  getImages(): Observable<any[]> {

    const images = of(IMAGES)
    return images;

  }
}
