import { Component, OnInit } from '@angular/core';
import { FetchImagesService } from '../../services/fetch-images.service';
// import {IMAGES} from '../../mock-images'

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
  images: any = [];


  constructor(private imageService: FetchImagesService) { }

  ngOnInit(): void {
    this.imageService.getImages().subscribe((images)=>{
      this.images = images
    });
  }

}
