import {
    trigger, // 动画封装触发，外部的触发器
    state, // 转场状态控制
    style, // 用来书写基本的样式
    transition, // 用来实现css3的 transition
    animate, // 用来实现css3的animations
    keyframes // 用来实现css3 keyframes的
} from '@angular/animations';


export const fadeIn = trigger('fadeIn', [
    state('in', style({transform: 'translate(0)'})), // 默认平移0
    transition('void => *', [ // 进场动画
        animate(500, keyframes([
            style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
            style({ opacity: 0.2, transform: 'translateX(-80%)', offset: 0.2 }),
            style({ opacity: 0.5, transform: 'translateX(-50%)', offset: 0.5 }),
            style({ opacity: 0.7, transform: 'translateX(-20%)', offset: 0.7 }),
            style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
        ]))
    ]),
    transition('* => void', [
        animate(500, keyframes([
            style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
            style({ opacity: 0.5, transform: 'translateX(-25%)', offset: 0.7 }),
            style({ opacity: 0, transform: 'translateX(-100%)', offset: 1.0 })
        ]))
    ]),
]);


// 定义一个鼠标点击运动的动画

export const boxAnimate = trigger('box', [
    // 定义一个状态left
    state('left', style({ 'background-color': '#360', transform: 'translate3d(0,0,0)' })),
    // 定义另外一个状态right
    state('right', style({ 'background-color': '#630', transform: 'translate3d(500px,0,0)' })),
    // 定义运动过程(从left到right状态)
    transition('left=>right', animate(5000, keyframes([
        style({ transform: 'translate3d(10%,0,0)' }),
        style({ transform: 'translate3d(20%,0,0)' }),
        style({ transform: 'translate3d(40%,0,0)' }),
        style({ transform: 'translate3d(50%,0,0)' }),
        style({ transform: 'translate3d(60%,0,0)' }),
        style({ transform: 'translate3d(70%,0,0)' }),
        style({ transform: 'translate3d(80%,0,0)' }),
        style({ transform: 'translate3d(90%,0,0)' }),
        style({ transform: 'translate3d(100%,0,0)' }),
    ]))),
    // 定义运动过程(从right到left)
    transition('right=>left', animate(5000, keyframes([
        style({ transform: 'translate3d(100%,0,0)' }),
        style({ transform: 'translate3d(80%,0,0)' }),
        style({ transform: 'translate3d(70%,0,0)' }),
        style({ transform: 'translate3d(40%,0,0)' }),
        style({ transform: 'translate3d(30%,0,0)' }),
        style({ transform: 'translate3d(0%,0,0)' })
    ]))),
]);