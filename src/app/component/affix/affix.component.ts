import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CacheService } from '../../service/cache/cache.service';

@Component({
  selector: 'app-affix',
  templateUrl: './affix.component.html',
  styleUrls: ['./affix.component.css']
})
export class AffixComponent implements OnInit {

  constructor(private cacheService: CacheService) { }
  @Output() affixClick: EventEmitter<any> = new EventEmitter();
  @Input() isAffix = true;
  isLogin = false;
  ngOnInit() {
    let userModel = this.cacheService.getUserModel();
    if (userModel)
      this.isLogin = true
  }
  onClick($event) {
    // console.log($event);
    this.affixClick.emit($event);
  }

}
