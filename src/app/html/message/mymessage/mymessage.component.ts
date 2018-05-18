import { Component, OnInit, AfterViewInit } from '@angular/core';
import { StudyService } from '../../../service/study/study.service';
import { ObserveEnum } from '../../../enum/ObserveEnum';
import { MessageHttpService } from '../../../service/message/messageHttp.Service';

@Component({
  selector: 'app-mymessage',
  templateUrl: './mymessage.component.html',
  styleUrls: ['./mymessage.component.css']
})
export class MymessageComponent implements OnInit, AfterViewInit {

  constructor(private _studyService: StudyService, private _message: MessageHttpService) { }
  messageList = [];
  isLoading = true;
  ngOnInit() {

  }
  ngAfterViewInit(): void {
    this._studyService.setSubarr(ObserveEnum.myMessageTitile, '我的消息');
    this.GetMessageList();
  }
  GetMessageList() {
    this._message.GetMessageList().subscribe(res => {
      
      this.messageList = res;
      this.isLoading = false;
    })
  }

}
