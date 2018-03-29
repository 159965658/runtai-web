import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.css']
})
export class LoadComponent implements OnInit {

  constructor() { }
  @Input() getListFlag: boolean;
  ngOnInit() {
     
  }

}
