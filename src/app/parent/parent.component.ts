import { Component, OnInit } from '@angular/core';
import { ChildService } from '../service/child.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  constructor(private child: ChildService ) { }

  ngOnInit() {
    this.child.GetSonList().subscribe(res=>{});
  }

}
