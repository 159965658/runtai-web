import { Component, OnInit, Input, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private el: ElementRef) { }
  @Input() msgFlag: boolean;
  @Output() changeSearch: EventEmitter<number> = new EventEmitter();
  @Input() msgLocal: boolean;
  @Input() msgLocal2: boolean;
  public titleFilter: FormControl = new FormControl();
  @ViewChild('searchInput') searchInput;
  @Input() inputValue;
  ngOnInit() { 
    this.msgFlag = this.msgFlag == undefined ? true : false;
    this.msgLocal2 = this.msgLocal2 == undefined ? true : this.msgLocal; 
    this.msgLocal = this.msgLocal == undefined ? true : this.msgLocal; 
    this.hideMsg(); 
    this.titleFilter.setValue(this.inputValue);
    this.titleFilter.valueChanges
      .debounceTime(500)
      .subscribe(
      value => this.changeSearch.emit(value)
      )
  }
  clickSearch(event) {
    this.hideMsg();
    if (this.msgFlag) { // true
      this.router.navigate(["/search"]);
    }
  }
  hideMsg() {
    if (!this.msgFlag && this.msgLocal2) { // false true
      this.msgLocal = false;
      this.searchInput.nativeElement.focus();
      return;
    }
  }
  goBack() {
    this.msgLocal = !this.msgLocal;
    this.msgFlag = !this.msgFlag;
    history.back();
  }
}
