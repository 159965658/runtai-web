import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoBackComponent } from './go-back/go-back.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { LoadingComponent } from './loading/loading.component';
import { LoadComponent } from './load/load.component';
import { StudyListComponent } from '../html/study/study-list/study-list.component';
import { UpLoadImgComponent } from './up-load-img/up-load-img.component';


@NgModule({
    imports: [CommonModule, NgZorroAntdModule.forRoot(), ReactiveFormsModule, FormsModule
    ],
    declarations: [GoBackComponent, LoadingComponent, LoadComponent, StudyListComponent, UpLoadImgComponent,
    ],
    exports: [CommonModule, GoBackComponent, LoadingComponent, LoadComponent, StudyListComponent,
        FormsModule, ReactiveFormsModule, UpLoadImgComponent]
})
export class SharedModule { }