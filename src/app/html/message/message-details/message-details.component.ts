import { Component, OnInit, AfterViewInit } from '@angular/core';
import { StudyService } from '../../../service/study/study.service';
import { ObserveEnum } from '../../../enum/ObserveEnum';
import { ActivatedRoute } from '@angular/router';
import { MessageHttpService } from '../../../service/message/messageHttp.Service';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.css']
})
export class MessageDetailsComponent implements OnInit, AfterViewInit {

  constructor(private _studyService: StudyService, private router: ActivatedRoute, private message: MessageHttpService) { }
  id = 0;
  model = null;
  ngOnInit() {
    this.router.queryParams.subscribe(res => {
      this.id = res.id
    })
  }
  ngAfterViewInit(): void {
    this._studyService.setSubarr(ObserveEnum.myMessageTitile, '消息详情');
    this.GetMessage();
  }
  GetMessage() {
    this.message.GetMessageDetails(this.id).subscribe(res => {
      console.log(res);
      this.model = res;
    })
  }

}
