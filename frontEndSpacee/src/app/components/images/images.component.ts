import { Component, OnInit } from '@angular/core';
import { FetchImagesService } from '../../services/fetch-images.service';


@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
  images: any = [];
  currentDate: string = ''


  constructor(private imageService: FetchImagesService) { }

  ngOnInit(): void {
    this.imageService.getImages().subscribe((images)=>{
      this.currentDate = '2021-10-19'
        this.images = images
    });
  }

  selectDate(date: string) {
    this.imageService.selectDate(date).subscribe((images)=>{
      this.currentDate = date;
      this.images = images
    });
  }

}
