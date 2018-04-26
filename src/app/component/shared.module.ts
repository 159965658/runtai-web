import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoBackComponent } from './go-back/go-back.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { LoadingComponent } from './loading/loading.component';
import { LoadComponent } from './load/load.component';
import { StudyListComponent } from '../html/study/study-list/study-list.component';
import { UpLoadImgComponent } from './up-load-img/up-load-img.component';
import { HeaderLoadingComponent } from './header-loading/header-loading.component';


@NgModule({
    imports: [CommonModule, NgZorroAntdModule.forRoot(), ReactiveFormsModule, FormsModule
    ],
    declarations: [GoBackComponent, LoadingComponent, LoadComponent, StudyListComponent, UpLoadImgComponent, HeaderLoadingComponent,
    ],
    exports: [CommonModule, GoBackComponent, LoadingComponent, LoadComponent, StudyListComponent,
        FormsModule, ReactiveFormsModule, UpLoadImgComponent, HeaderLoadingComponent]
})
export class SharedModule { }