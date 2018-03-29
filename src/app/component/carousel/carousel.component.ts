import { Component, OnInit } from '@angular/core';
import { CarouselService } from '../../service/carousel/carousel.service';
import { RequestCarouselModel } from '../../interface/carousel/requestCarouselModel';
import 'rxjs/Rx';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  array = [1, 2, 3, 4];
  url = environment.pathImg;
  constructor(private bannerServe: CarouselService) { }
  ngOnInit() {
    this.bannerServe.GetIndexBanner(new RequestCarouselModel()).subscribe(res => {
      if (res.length != 0) {
        this.array = res;
      }

    })
  }

}
