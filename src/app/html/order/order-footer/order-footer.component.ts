import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-order-footer',
  templateUrl: './order-footer.component.html',
  styleUrls: ['./order-footer.component.css']
})
export class OrderFooterComponent implements OnInit {
  @Input() price: any;
  @Input() butTxt: any;


  @Output() clickOrderEmit: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
    
  }
  clickOrder() {
    //发送消息
    this.clickOrderEmit.emit();
  }

}
