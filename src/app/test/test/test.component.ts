import { Component, OnInit } from '@angular/core';
import { AnimationBuilder, style, animate } from '@angular/animations';
import { fadeIn, boxAnimate } from '../test';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  animations: [fadeIn, boxAnimate]
})
export class TestComponent implements OnInit {
  ngOnInit(): void {
    //this.makeAnimation(document.querySelector('p'));
    // throw new Error("Method not implemented.");

  }
  // 定义开始的状态
  private boxState: String = 'left';
  private _isTrue: Boolean = true;
  pflag = true;
  constructor(private _builder: AnimationBuilder) { }

  makeAnimation(element: any) {
    // first build the animation
    const myAnimation = this._builder.build([
      style({ width: 0 }),
      animate(1000, style({ width: '100px' }))
    ]);

    // then create a player from it
    const player = myAnimation.create(element);

    player.play();
  }
  click() {
    this.pflag = !this.pflag
  }
  start(): void {
   
    if (this._isTrue) {
      this.boxState = 'right';
    } else {
      this.boxState = 'left';
    }
    this._isTrue = !this._isTrue;
  }

}







