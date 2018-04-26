import { Component, OnInit, ElementRef } from '@angular/core';
import { CacheService } from '../../service/cache/cache.service';
import { CacheUserModel } from '../../interface/cache/cacheUserModel';
import { environment } from '../../../environments/environment';
import { UtilMethodService } from '../../util/util-method.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { host } from '../../service/hostApi';
import { CacheEnum } from '../../enum/cacheEnum';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css']
})
export class PersonalDataComponent implements OnInit {

  constructor(private cache: CacheService, private el: ElementRef, private util: UtilMethodService, private router: Router, private http: HttpClient) { }
  user = new CacheUserModel();
  url = environment.pathImg;
  url2 = environment.api;
  isInput = false;
  ngOnInit() {
    let usermodel = this.cache.getUserModel();
    this.user = usermodel;
    this.user.s_head_portrait = this.user.s_head_portrait;
    console.log(this.user);
  }
  fileLoad() {
    let dom = this.el.nativeElement.querySelector('.upload');
    dom.click();
  }
  fileChange(event) {

    let fileList: FileList = event.target.files;
    let formData: FormData = new FormData();
    formData.append('file', fileList[0], fileList[0].name);
    //  let headers = new Headers();
    const headers = new HttpHeaders();
    headers.append("Content-Type", 'multipart/form-data');
    headers.append('Accept', 'application/json');
    console.log(formData.get('file'));
    this.http.post(host + '/WebSite/UploadImage?i_user_id=' + this.user.UserId, formData, { headers }).subscribe(res => {
      this.user.s_head_portrait = res['Data'];
      this.cache.setLocalCache(CacheEnum.loginKey, this.user);
      this.user.s_head_portrait =  this.user.s_head_portrait;
      console.log(res);
    })
    //const imgEncode = this.util.getBase64Image(fileList[0]);
    // this.isInput = true;
    // let th = this;
    // imgEncode.onload = function () {
    //   th.isInput = false;
    //   th.router.navigate(['/upImg'], {
    //     queryParams: {
    //       base: this.result
    //     }
    //   });
    //   // console.log(this.result);
    // }

  }
}
