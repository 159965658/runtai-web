import { Injectable } from '@angular/core';
import { HttpBaseService } from '../../util/http-Base.service';
import { IndexHuiKuan } from '../../interface/order/index-hui-kuan';
import { Urls } from '../url';
import { Observable } from 'rxjs';
import { GetCourseOrder } from '../../interface/order/get-course-order';
import { GetCourseOrderList } from '../../interface/order/get-course-order-list';
import { CacheService } from '../cache/cache.service';
import { CacheEnum } from '../../enum/cacheEnum';
import { CacheUserModel } from '../../interface/cache/cacheUserModel';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class OrderService {
  private subjectOrder = new Subject<any>();
  constructor(private http: HttpBaseService, private _cacheService: CacheService) { }
  IndexHuiKuan(req: IndexHuiKuan): Observable<any> {
    return this.http.httpPost(Urls.IndexHuiKuan, req);
  }
  GetCourseOrder(req: GetCourseOrder): Observable<any> {
    return this.http.httpPost(Urls.GetCourseOrder, req);
  }
  GetCourseOrderList(req: GetCourseOrderList): Observable<any> {
    return this.http.httpPost(Urls.GetCourseOrderList, req);
  }
  CancelHuikuan(id: number) { //取消订单
    return this.http.httpPost(Urls.CancelHuikuan, { i_id: id });
  }
  //观察订单参数
  SetSubjectOrderList(req: GetCourseOrderList) {
    let userModel = this._cacheService.getUserModel();
    req.i_users_id = userModel.UserId;
    this.subjectOrder.next(req);
  }
  //返回一个被观察对象
  GetSubjectOrderList(): Observable<any> {
    return this.subjectOrder.asObservable();
  }

}
