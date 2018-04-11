import { Routes, RouterModule, CanActivateChild } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ParentComponent } from './parent.component';
import { MyTableComponent } from './private/my-table/my-table.component';
import { FooterComponent } from "./public/footer/footer.component";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { MyParentComponent } from './private/my-parent/my-parent.component';
import { CanLoginActivate, CheckSonListActivate } from "../guard-auth/can-login-activate";
import { DDirective } from './d.directive';
import { SonComponent } from './private/son/son.component';
import { SharedModule } from "../component/shared.module";
import { SonAddComponent } from './private/son-add/son-add.component';
import { SonDetailsComponent } from './private/son-details/son-details.component';
import { SharedPipeModule } from "../pipe/sharedpipe.module";
import { ChangePhoneComponent } from './private/change-phone/change-phone.component';
import { LearnComponent } from './private/learn/learn.component';
import { CourseListComponent } from './public/course-list/course-list.component';
import { CourserListFooterComponent } from './public/courser-list-footer/courser-list-footer.component';
import { ErrorWorkCountComponent } from './public/error-work-count/error-work-count.component';
import { LearnMoreComponent } from './private/learn-more/learn-more.component';
import { ClassDataListComponent } from './public/class-data-list/class-data-list.component';
import { DataMoreComponent } from './private/data-more/data-more.component';
// import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { ImageErrorDirective } from "../directive/image-error.directive";
export const ROUTES: Routes = [
    {
        path: '',
        component: ParentComponent,

        children: [
            { path: '', redirectTo: 'my', pathMatch: 'full' },
            { path: 'main', component: MyTableComponent, canActivate: [CheckSonListActivate], },
            { path: 'my', component: MyParentComponent },
            { path: 'love', component: LearnComponent, canActivate: [CheckSonListActivate], },
        ]
    },
    { path: 'sonlist', component: SonComponent },
    { path: 'son-add', component: SonAddComponent },
    { path: 'son-details', component: SonDetailsComponent },
    { path: 'cp', component: ChangePhoneComponent },
    { path: 'love-more', component: LearnMoreComponent, canActivate: [CheckSonListActivate] },
    { path: 'data-more', component: DataMoreComponent, canActivate: [CheckSonListActivate] },
]
@NgModule({
    imports: [
        RouterModule.forChild(ROUTES),
        NgZorroAntdModule.forRoot(),
        SharedModule,
        SharedPipeModule
        // ReactiveFormsModule,
    ],
    providers: [CheckSonListActivate],
    declarations: [ParentComponent, MyTableComponent, FooterComponent, MyParentComponent,
        DDirective, SonComponent, SonAddComponent, SonDetailsComponent, ChangePhoneComponent,
        LearnComponent, CourseListComponent, CourserListFooterComponent, ErrorWorkCountComponent,
        LearnMoreComponent, ClassDataListComponent, DataMoreComponent],
})
export class ParentModule { };
