import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { MessageService } from '../../service/message.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnDestroy {

  constructor(private _message: NzMessageService, private _messageService: MessageService) { }
  subscribeObject: Subscription
  ngOnInit() {
    this.subscribeObject = this._messageService.getMessage().subscribe(res => {
     // console.log(res);
      if (res.message == 'Unknown Error') {
        res.message = '请求不流畅，请刷新后再试。';
      }
      this.createMessage(res.error, res.message);
    });
  }
  createMessage = (type, text) => {
    this._message.remove();
    this._message.create(type, `${text}`);
  };
  ngOnDestroy() {
    this.subscribeObject.unsubscribe();
  }
}
