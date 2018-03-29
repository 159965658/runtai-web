import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-courser-list-footer',
  templateUrl: './courser-list-footer.component.html',
  styleUrls: ['./courser-list-footer.component.css']
})
export class CourserListFooterComponent implements OnInit {

 
  @Input() list;

  ngOnInit() {

  }

}
