import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { GetMessage } from '../../interface/message/getMessage';
import { HttpBaseService } from '../../util/http-Base.service';
import { Urls } from '../url';
import { CacheService } from '../cache/cache.service';
import { GetMessageDetails } from '../../interface/message/getMessageDetails';

@Injectable()
export class MessageHttpService {
  constructor(private http: HttpBaseService, private cache: CacheService) { }
  GetMessageList(): Observable<any> {  //获取消息列表
    let req = new GetMessage();
    req.i_user_id = this.cache.getUserModel().UserId;
    return this.http.httpPost(Urls.GetMessageList, req);
  }
  GetMessageDetails(id: number): Observable<any> {//获取消息详情
    let req = new GetMessageDetails();
    req.i_user_id = this.cache.getUserModel().UserId;
    req.i_messageid = id;
    return this.http.httpPost(Urls.GetMessageDetails, req);
  }
}
