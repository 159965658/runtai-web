import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyGradeSubPipe } from './my-grade-sub.pipe';
import { ImageErrorDirective } from '../directive/image-error.directive';
import { SwitchDatePipe } from './switch-date.pipe';
import { JsonParsePipe } from './json-parse.pipe';


@NgModule({
    imports: [
    ],
    declarations: [MyGradeSubPipe, ImageErrorDirective, SwitchDatePipe, JsonParsePipe
    ],
    exports: [MyGradeSubPipe, ImageErrorDirective, SwitchDatePipe, JsonParsePipe]
})
export class SharedPipeModule { }