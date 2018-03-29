import { Component, OnInit,Input } from '@angular/core'; 

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {
  @Input() teacherList = new Array();
  constructor() { }

  ngOnInit() {
  }

}
