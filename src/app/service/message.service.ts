import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { GetMessage } from '../interface/message/getMessage';
import { HttpBaseService } from '../util/http-Base.service';
import { Urls } from './url';
import { StaticModel } from '../interface/staticModel';

@Injectable()
export class MessageService {
  private subjectMessage = new Subject<any>();
  private weChat = null;
  constructor() { }
  setMessage(sendMessage) {
    this.subjectMessage.next(sendMessage);
  }
  getMessage(): Observable<any> {
    return this.subjectMessage.asObservable();
  }
  getweChat() {
    return this.weChat;
  }
  setweChat(req: StaticModel) {
    this.weChat = req;
  }
}
