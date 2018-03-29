import { Injectable } from '@angular/core';
import { HttpBaseService } from '../../util/http-Base.service';
import { Urls } from '../url';
import { RequestCarouselModel } from '../../interface/carousel/requestCarouselModel';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CarouselService {
  urls = Urls;
  constructor(private http: HttpBaseService) { }
  GetIndexBanner(req:RequestCarouselModel): Observable<any> { //获取轮播图
    return this.http.httpPost(this.urls.GetIndexBanner, req);
  }
}
