import { CanActivate, ActivatedRouteSnapshot, Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { Injectable } from "@angular/core";
import { CacheService } from "../service/cache/cache.service";
import { CacheEnum } from "../enum/cacheEnum";
import { UtilMethodService } from "../util/util-method.service";
import { ChildService } from "../service/child.service";
import { MessageService } from "../service/message.service";
@Injectable()
export class CanLoginActivate implements CanActivate { //检测是否登录

    constructor(private util: UtilMethodService, private cache: CacheService) {

    }
    canActivate(route: ActivatedRouteSnapshot) { //检测是否登录  订单 > all  
        return this.util.canLogin(this.cache.getUserModel());
    }

}
@Injectable()
export class CanIsParentActivate implements CanActivate { //检测是否是家长

    constructor(private util: UtilMethodService, private cache: CacheService) {

    }
    canActivate(route: ActivatedRouteSnapshot) {
        return this.util.canisParent(this.cache.getUserModel());
    }

}


@Injectable()
export class CanIsLoginActivate implements CanActivate { //登录页面守卫

    constructor(private cache: CacheService, private router: Router) {

    }
    canActivate(route: ActivatedRouteSnapshot) {
        let c = this.cache.getUserModel();
        //判断是否是家长登录
        if (c != null) {
            if (c.i_role_permission == 2)
                this.router.navigate(['/p-home']);
            else if (c.i_role_permission == 0)
                this.router.navigate(['/main']);
            return false;
        }
        return true;
    }
}


@Injectable()
export class CanIsPassWordActivate implements CanActivate { //登录页面守卫

    constructor(private cache: CacheService, private router: Router) {

    }
    canActivate(route: ActivatedRouteSnapshot) {
        let c = this.cache.getUserModel();
        let jsPath = window.location.href;
        let path = jsPath.substring(jsPath.indexOf("#") + 1, jsPath.length);
        if (c) {
            return true;
        }
        this.router.navigate(['/login'], {
            queryParams: {
                router: path
            }
        });
        return false;
    }
}



@Injectable()
export class CheckSonListActivate implements CanActivate {
    constructor(private child: ChildService, private router: Router, private message: MessageService, private util: UtilMethodService, private cache: CacheService) {

    }
    canActivate(route: ActivatedRouteSnapshot) {
        return true;
    }
}