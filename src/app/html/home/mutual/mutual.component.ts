import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ScrollModel, ScrollService } from '../../../util/mutual/scroll.service';

@Component({
  selector: 'app-mutual',
  templateUrl: './mutual.component.html',
  styleUrls: ['./mutual.component.css']
})
export class MutualComponent implements OnInit {
  @Output() changeNumber: EventEmitter<number> = new EventEmitter();
  @Input() getListFlag: boolean;
  constructor(private scrollService: ScrollService) { }
  hflag = false;
  cflag = false;
  ngOnInit() {
    this.getListFlag = false;
    const th = this;
    Observable.fromEvent(window, 'scroll').subscribe((event) => {
      const bodyh = document.body.clientHeight || document.documentElement.clientHeight;//浏览器高度
      const t = document.documentElement.scrollTop || document.body.scrollTop; //滚动距离
      const scrollH = document.body.scrollHeight || document.documentElement.scrollHeight; //滚动高度   
      if (t > 142) {
        th.hflag = true;
      }
      if (t < 134) {
        th.hflag = false;
      }
      if (bodyh + t > (scrollH-50)) {
        if (th.getListFlag) {
          const getModel = this.scrollService.getModel();
          th.getListFlag = false;
          th.changeNumber.emit(getModel.pageIndex);//通知加载数据
        }
      }
    }) 
  }

}
