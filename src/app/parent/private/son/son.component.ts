import { Component, OnInit } from '@angular/core';
import { ChildService } from '../../../service/child.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-son',
  templateUrl: './son.component.html',
  styleUrls: ['./son.component.css']
})
export class SonComponent implements OnInit {

  constructor(private child: ChildService) { }
  res = [];
  isInput = false;
  url = environment.pathImg;
  ngOnInit() {
    let res = this.child.GetSonList();
    res.subscribe(res => {
      this.child.childList = res.length;
      this.res = res;
    
    })
  }

}
