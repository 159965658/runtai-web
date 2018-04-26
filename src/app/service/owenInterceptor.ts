import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";
import { urlOwen } from "./hostApi";
import { CacheService } from "./cache/cache.service";
import { CacheEnum } from "../enum/cacheEnum";
import { ActivatedRoute } from "@angular/router";
import { MessageService } from "./message.service";
import { CacheUserModel } from "../interface/cache/cacheUserModel";
import { environment } from "../../environments/environment";

@Injectable()
export class NoopInterceptor implements HttpInterceptor {
  constructor(private cache: CacheService, private message: MessageService) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let urlArr = urlOwen.split(",");
    let urrF = false;
    let newReq: any;
    //{ headers: req.headers.set("Content-Type", "application/json") }
    newReq = req.clone();
    urlArr.forEach(element => {
      //是否有登录控制
      if (req.url.indexOf(element) > -1) {
        urrF = true;
      }
    });
    let userModel = this.cache.getUserModel();
    if (urrF) {
      if (!userModel) {
        this.message.setMessage({
          error: "error",
          message: "游客暂时无法进行操作"
        });
        let httpe: HttpEvent<any>;
        return Observable.of(httpe);
      }
      const id = userModel.UserId;
      newReq.body["i_users_id"] = id;
    }
    if (newReq.body)
      newReq.body["s_domain_name"] = userModel
        ? userModel.s_domain_name
        : environment.s_domain_name;
    return next.handle(newReq);
  }
}
