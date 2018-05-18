import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observer, Observable } from 'rxjs';

@Component({
  selector: 'app-up-load-img',
  templateUrl: './up-load-img.component.html',
  styleUrls: ['./up-load-img.component.css']
})
export class UpLoadImgComponent implements OnInit, AfterViewInit {
  addHeight: number;
  oldHeight: any;
  oldTop: number;
  constructor(private el: ElementRef, private activeRouter: ActivatedRoute) { }
  @ViewChild('img') img: ElementRef;
  // @ViewChild('img1') img1: ElementRef;
  @ViewChild('img2') img2: ElementRef;
  baseImg: string;
  //计算选取区域相对图片的位置
  pTop: number;
  pLeft: number;
  pRight: number;
  pDown: number;
  box = null;
  flag = true; //是否可以拖动
  pic = null;
  previewImg = null;
  mainBox = null;
  control = null;
  controlIndex = null;
  oldWidth: number;
  oldClientX: number; oldClientY: number; oldX: number; oldY: number; addWidth: number;
  ngOnInit() {
    this.activeRouter.queryParams.subscribe(res => {
      this.baseImg = res.base;
    })
  }
  ngAfterViewInit(): void {
    this.setImg();
    this.bandInit();
    this.setDom();
  }
  setImg() {
    this.img.nativeElement['src'] = this.baseImg;
    this.img2.nativeElement['src'] = this.baseImg;
    this.control = document.getElementsByClassName('minDiv');
  }
  setDom() {
    this.pic = this.getId('img2');
    this.box = this.getId('main');

    // this.previewImg = this.getId('previewImg');
    this.mainBox = this.getId('example');
  }
  bandInit() {
    let box = this.getBox(), control = this.control;
    //console.log(box);
    let th = this;
    Observable.fromEvent(box, 'mousedown').subscribe((e) => {
      if (this.flag) {
        this.oldClientX = e['clientX'],
          this.oldClientY = e['clientY'],
          this.oldX = box.offsetLeft,
          this.oldY = box.offsetTop;
        box.style.cursor = "move";
        let obserMove = Observable.fromEvent(this.img.nativeElement, 'mousemove').subscribe((e) => {
          this.drag(e);
          Observable.fromEvent(window, 'mouseup').subscribe((e) => {
            obserMove.unsubscribe();
            box.style.cursor = "";
          });
        });
      } 
      for (var i = 0; i < control.length; i++) {

        control[i].addEventListener('mousedown', (function (i) {
          return function () {
            th.Handler(i);
          };
        })(i), false);
      }
    })
  }
  drag(e) {
    var addX, addY;
    addX = e.clientX - this.oldClientX;
    addY = e.clientY - this.oldClientY;

    this.box.style.left = addX + this.oldX + 'px';
    this.box.style.top = addY + this.oldY + 'px';
   // console.log(this.img.nativeElement.height, this.pic.height);
    //设置选择区域不超过图片大小
    this.caculateP();
    if (this.pTop < 0) {
      this.box.style.top = 0;
    }
    if (this.pLeft < 0) {
      this.box.style.left = 0;
    }
    if (this.pRight > this.mainBox.clientWidth) {
      this.box.style.left = this.mainBox.clientWidth - this.box.clientWidth + 'px';
    }
    if (this.pDown > this.mainBox.clientHeight) {
      this.box.style.top = this.mainBox.clientHeight - this.box.clientHeight + 'px';
    }
    this.setChoice();
    e.preventDefault();
  }
  Handler(index) {
    var direct = this.controlIndex = this.control[index].getAttribute('id');
    //此时在调整大小，不能拖动
    this.flag = false;
    let th = this;
    window.addEventListener('mousemove', function (e) {
      th.moveHandler(e);
    }, false);
    window.addEventListener('mouseup', function () {
      window.removeEventListener('mousemove', th.moveHandler, false);
      th.flag = true;
    }, false);
    //设置pic层同box层共同改变
    this.setChoice();
    //取消默认事件（选中）
    // e.preventDefault();
    return false;
  }
  moveHandler(e) {
    switch (this.controlIndex) {
      case 'left-up':
        this.moveLeft(e);
        this.moveUp(e);
        break;
      case 'left':
        this.moveLeft(e);
        break;
      case 'left-down':
        this.moveLeft(e);
        this.moveDown(e);
        break;
      case 'up':
        this.moveUp(e);
        break;
      case 'right-up':
        this.moveRight(e);
        this.moveUp(e);
        break;
      case 'right':
        this.moveRight(e);
        break;
      case 'right-down':
        this.moveRight(e);
        this.moveDown(e);
        break;
      case 'down':
        this.moveDown(e);
        break;
      default:
       // console.warn('error');
    }
  }
  //四个方向的处理函数
  moveLeft(e) {
    var leftX = e.clientX;
    let oldLeft = parseInt(window.getComputedStyle(this.box, null).left);
    this.oldWidth = this.box.clientWidth;
    this.addWidth = this.getPosition(this.box).left - leftX;

    this.box.style.width = this.oldWidth + this.addWidth + 'px';
    this.box.style.left = oldLeft - this.addWidth + 'px';

    //设置选择区域不超过图片大小
    this.caculateP();
    if (this.pLeft < 0) {
      this.box.style.left = 0;
      this.box.style.width = this.oldWidth + 'px';
    }
  }
  moveUp(e) {
    var upY = e.clientY;

    this.oldTop = parseInt(window.getComputedStyle(this.box, null).top);
    this.oldHeight = this.box.clientHeight;
    this.addHeight = this.getPosition(this.box).top - upY;

    this.box.style.height = this.oldHeight + this.addHeight + 'px';
    this.box.style.top = this.oldTop - this.addHeight + 'px';

    //设置选择区域不超过图片大小
    this.caculateP();
    if (this.pTop < 0) {
      this.box.style.top = 0;
      this.box.style.height = this.oldHeight + 'px';
    }
  }
  moveDown(e) {
    var downY = e.clientY;

    this.oldHeight = this.box.clientHeight;
    this.addHeight = downY - this.oldHeight - this.getPosition(this.box).top;

    this.box.style.height = this.oldHeight + this.addHeight + 'px';

    //设置选择区域不超过图片大小
    this.caculateP();
    if (this.pDown > this.mainBox.clientHeight) {
      this.box.style.top = this.mainBox.clientHeight - this.oldHeight + 'px';
      this.box.style.height = this.oldHeight + 'px';
    }
  }
  moveRight(e) {
    var rightX = e.clientX;

    this.oldWidth = this.box.clientWidth;
    this.addWidth = rightX - this.oldWidth - this.getPosition(this.box).left;

    this.box.style.width = this.oldWidth + this.addWidth + 'px';

    //设置选择区域不超过图片大小
    this.caculateP();
    if (this.pRight > this.mainBox.clientWidth) {
      this.box.style.left = this.mainBox.clientWidth - this.oldWidth + 'px';
      this.box.style.width = this.oldWidth + 'px';
    }
  }
  // onInit() {
  //   var left = this.getId('left'),
  //     up = this.getId('up'),
  //     right = this.getId('right'),
  //     down = this.getId('down');
  //   var box = this.getId('main'),
  //     pic = this.getId('img2'),
  //     previewImg = this.getId('previewImg'),
  //     mainBox = this.getId('example'),
  //     control = document.getElementsByClassName('minDiv'),
  //     flag = true, //是否可以拖动
  //     oldWidth, addWidth, oldHeight, addHeight, oldTop;
  //   //选取位置拖动
  //   box.addEventListener('mousedown', mHandler, false);

  //   function mHandler(e) {
  //     if (flag) {
  //       var oldClientX = e.clientX,
  //         oldClientY = e.clientY,
  //         oldX = box.offsetLeft,
  //         oldY = box.offsetTop;
  //       box.style.cursor = "move";
  //       window.addEventListener('mousemove', drag, false);
  //       window.addEventListener('mouseup', stop, false);




  //     }
  //   }

  //   //图片剪切大小的调整
  //   for (var i = 0; i < control.length; i++) {
  //     //绑定事件的时候需要传递i到处理函数
  //     control[i].addEventListener('mousedown', (function (i) {
  //       return function () {
  //         Handler(i);
  //       };
  //     })(i), false);
  //   }

  //   function Handler(index) {
  //     var direct = control[index].getAttribute('id');
  //     //此时在调整大小，不能拖动
  //     flag = false;

  //     window.addEventListener('mousemove', moveHandler, false);
  //     window.addEventListener('mouseup', upHandler, false);

  //     function moveHandler(e) {
  //       switch (direct) {
  //         case 'left-up':
  //           moveLeft(e);
  //           moveUp(e);
  //           break;
  //         case 'left':
  //           moveLeft(e);
  //           break;
  //         case 'left-down':
  //           moveLeft(e);
  //           moveDown(e);
  //           break;
  //         case 'up':
  //           moveUp(e);
  //           break;
  //         case 'right-up':
  //           moveRight(e);
  //           moveUp(e);
  //           break;
  //         case 'right':
  //           moveRight(e);
  //           break;
  //         case 'right-down':
  //           moveRight(e);
  //           moveDown(e);
  //           break;
  //         case 'down':
  //           moveDown(e);
  //           break;
  //         default:
  //           console.warn('error');
  //       }

  //       //设置pic层同box层共同改变
  //       setChoice();
  //       //取消默认事件（选中）
  //       e.preventDefault();
  //     }

  //     function upHandler() {
  //       window.removeEventListener('mousemove', moveHandler, false);
  //       //调整完大小后标记为可拖动
  //       flag = true;
  //     }
  //   }
  //   //四个方向的处理函数
  //   function moveLeft(e) {
  //     var leftX = e.clientX;

  //     oldLeft = parseInt(window.getComputedStyle(box, null).left);
  //     oldWidth = box.clientWidth;
  //     addWidth = getPosition(box).left - leftX;

  //     box.style.width = oldWidth + addWidth + 'px';
  //     box.style.left = oldLeft - addWidth + 'px';

  //     //设置选择区域不超过图片大小
  //     caculateP();
  //     if (pLeft < 0) {
  //       box.style.left = 0;
  //       box.style.width = oldWidth + 'px';
  //     }
  //   }

  //   function moveRight(e) {
  //     var rightX = e.clientX;

  //     oldWidth = box.clientWidth;
  //     addWidth = rightX - oldWidth - getPosition(box).left;

  //     box.style.width = oldWidth + addWidth + 'px';

  //     //设置选择区域不超过图片大小
  //     caculateP();
  //     if (pRight > mainBox.clientWidth) {
  //       box.style.left = mainBox.clientWidth - oldWidth + 'px';
  //       box.style.width = oldWidth + 'px';
  //     }
  //   }

  //   function moveUp(e) {
  //     var upY = e.clientY;

  //     oldTop = parseInt(window.getComputedStyle(box, null).top);
  //     oldHeight = box.clientHeight;
  //     addHeight = getPosition(box).top - upY;

  //     box.style.height = oldHeight + addHeight + 'px';
  //     box.style.top = oldTop - addHeight + 'px';

  //     //设置选择区域不超过图片大小
  //     caculateP();
  //     if (pTop < 0) {
  //       box.style.top = 0;
  //       box.style.height = oldHeight + 'px';
  //     }
  //   }

  //   function moveDown(e) {
  //     var downY = e.clientY;

  //     oldHeight = box.clientHeight;
  //     addHeight = downY - oldHeight - getPosition(box).top;

  //     box.style.height = oldHeight + addHeight + 'px';

  //     //设置选择区域不超过图片大小
  //     caculateP();
  //     if (pDown > mainBox.clientHeight) {
  //       box.style.top = mainBox.clientHeight - oldHeight + 'px';
  //       box.style.height = oldHeight + 'px';
  //     }
  //   }

  //   //设置pic层同box层共同改变
  //   function setChoice() {
  //     var top = box.offsetTop,
  //       left = box.offsetLeft,
  //       right = left + box.clientWidth,
  //       down = top + box.clientHeight;

  //     pic.style.clip = 'rect(' + top + 'px,' + right + 'px,' + down + 'px,' + left + 'px)';
  //     setPreview();
  //   }


  // }
  //工具方法
  getId(id) {
    return document.getElementById(id);
  }
  getBox() {
    return this.box ? this.box : this.getId('main');
  }
  caculateP() {
    let box = this.getBox();
    this.pTop = box.offsetTop;
    this.pLeft = box.offsetLeft;
    this.pRight = this.pLeft + box.clientWidth;
    this.pDown = this.pTop + box.clientHeight;
  }
  //设置pic层同box层共同改变
  setChoice() {
    let box = this.getBox();
    var top = box.offsetTop,
      left = box.offsetLeft,
      right = left + box.clientWidth,
      down = top + box.clientHeight;

    this.pic.style.clip = 'rect(' + top + 'px,' + right + 'px,' + down + 'px,' + left + 'px)';
    // this.setPreview();
  }
  //设置preview
  setPreview() {
    let box = this.getBox();
    var top = box.offsetTop,
      left = box.offsetLeft,
      right = left + box.clientWidth,
      down = top + box.clientHeight;
    //console.log(this.previewImg);
    this.previewImg.style.clip = 'rect(' + top + 'px,' + right + 'px,' + down + 'px,' + left + 'px)';
    this.previewImg.style.left = -left + 'px';
    this.previewImg.style.top = -top + 'px';
  }
  /**
 * 获取位置
 * @param node
 * @returns {{left: (Number|number), top: (Number|number)}}
 */
  getPosition(node) {
    var position = {
      'left': node.offsetLeft,
      'top': node.offsetTop
    };
    //offsetParent是保存影响当前元素定位的父元素，parentNode则不存在这一关系还会存在文本节点。
    var parent = node.offsetParent;
    while (parent) {
      position.left += parent.offsetLeft;
      position.top += parent.offsetTop;
      parent = parent.offsetParent;
    }
    return position;
  }
}
