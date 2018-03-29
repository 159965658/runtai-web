import { Component, OnInit, AfterViewInit } from '@angular/core';
import { StudyService } from '../../service/study/study.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

import { ObserveEnum } from '../../enum/ObserveEnum';

@Component({
  selector: 'app-message-a',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponenta implements OnInit, OnDestroy, AfterViewInit {
  ngAfterViewInit(): void {

  }
  ngOnDestroy(): void {
    this._studyServeice.clearSubarr([ObserveEnum.myMessageTitile])
  }

  constructor(private _studyServeice: StudyService) { }
  title = '';
  ngOnInit() {
    this._studyServeice.getSubAarr(ObserveEnum.myMessageTitile).subscribe((res) => {
      setTimeout(() => {
        this.title = res;
      }, 500);
    });
  }


}
