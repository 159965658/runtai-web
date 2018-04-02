import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CourseModel } from '../../interface/courseModel';
import { CourseService } from '../../service/course/course.service';
import { GetElectiveCenter } from '../../interface/GetElectiveCenter';
import { ScrollService } from '../../util/mutual/scroll.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, OnDestroy {
  // @ViewChild('bar') barTarget;
  liActive = { index: 0, indexTwo: 1, menuHeight: 0 }
  lilist = [{
    id: 1,
    value: '区域',
    subValue: [{
      name: '区域课程',
      value: 2,
      isChecked: true
    }, {
      name: '全国课程',
      value: 1,
      isChecked: false
    }]
  }, {
    id: 2,
    value: '学段',
    subValue: [{
      name: '小学',
      value: 1,
      isChecked: false
    }, {
      name: '初中',
      value: 2,
      isChecked: false,
    }, {
      name: '高中',
      value: 3,
      isChecked: false,
    }]
  }, {
    id: 3,
    value: '年级',
    subValue: [{
      name: '一年级',
      value: 1,
      isChecked: false
    }, {
      name: '二年级',
      value: 2,
      isChecked: false
    }, {
      name: '三年级',
      value: 3,
      isChecked: false
    }, {
      name: '四年级',
      value: 4,
      isChecked: false
    }, {
      name: '五年级',
      value: 5,
      isChecked: false
    }, {
      name: '六年级',
      value: 6,
      isChecked: false
    }, {
      name: '七年级',
      value: 7,
      isChecked: false
    }, {
      name: '八年级',
      value: 8,
      isChecked: false
    }, {
      name: '九年级',
      value: 9,
      isChecked: false
    }
      , {
      name: '高一',
      value: 10,
      isChecked: false
    }
      , {
      name: '高二',
      value: 11,
      isChecked: false
    }
      , {
      name: '高三',
      value: 12,
      isChecked: false
    }]
  }, {
    id: 4,
    value: '科目',
    subValue: [{
      name: '语文',
      value: 1,
      isChecked: false
    }, {
      name: '数学',
      value: 2,
      isChecked: false
    }, {
      name: '英语',
      value: 3,
      isChecked: false
    }, {
      name: '科学',
      value: 4,
      isChecked: false
    }, {
      name: '物理',
      value: 5,
      isChecked: false
    }, {
      name: '化学',
      value: 6,
      isChecked: false
    }
      , {
      name: '生物',
      value: 7,
      isChecked: false
    }
      , {
      name: '历史',
      value: 8,
      isChecked: false
    }, {
      name: '政治',
      value: 9,
      isChecked: false
    }, {
      name: '地理',
      value: 10,
      isChecked: false
    }, {
      name: '美术',
      value: 11,
      isChecked: false
    }, {
      name: '音乐',
      value: 12,
      isChecked: false
    }]
  }]
  lilistTwo = [{
    id: 1,
    value: '默认排序',
  },
  {
    id: 2,
    value: '热度',
  },
  {
    id: 3,
    value: '最新',
  },
  {
    id: 4,
    value: '费用',
  }]
  subValue = new Array();
  coursel = new Array();
  ulMenu = false;
  reqCourse = new GetElectiveCenter();
  getListFlag = true; //不显示加载中
  getFlag = true;//false禁止加载
  subscription: any;
  icon = 0;
  constructor(private courseService: CourseService, private scrollService: ScrollService) { }

  ngOnInit() {
    this.scrollService.defaultModel();
    this.getSublist();
    this.GetElectiveCenter();

    this.subscription = Observable.fromEvent(window, 'scroll').subscribe((event) => {
      const bodyh = document.body.clientHeight || document.documentElement.clientHeight;//浏览器高度
      const t = document.documentElement.scrollTop || document.body.scrollTop; //滚动距离
      const scrollH = document.body.scrollHeight || document.documentElement.scrollHeight; //滚动高度     
      if (bodyh + t > (scrollH - 50)) {
        if (this.getListFlag) {
          this.GetElectiveCenter();
        }
      }
    })
  }
  getSublist() {
    //获取学科
    this.courseService.getSubjectCache().subscribe(list => {
      let subList = this.lilist.find(p => p.id == 4);
      subList.subValue = [];
      console.log(this.lilist);
      list.forEach(item => {
        subList.subValue.push({ isChecked: false, value: item.i_id, name: item.s_name })
        // item.s_name = ;
      });
    });

  }
  ngOnDestroy() {
    // 取消订阅
    this.subscription.unsubscribe();
  }
  GetElectiveCenter(i: boolean = false) {
    let pageModel = this.scrollService.getModel();
    console.log(pageModel);
    if (i) {
      pageModel = this.scrollService.defaultModel();
      this.getFlag = true;
    }
    if (!this.getFlag) {
      return;
    }

    this.getListFlag = false; //显示加载中
    pageModel.pageIndex = pageModel.pageIndex + 1;
    this.reqCourse.pageIndex = pageModel.pageIndex;
    this.courseService.GetElectiveCenter(this.reqCourse).subscribe(res => {
      this.getListFlag = true;//隐藏加载中
      if (res.length == 0) {
        //this.coursel = [];
        console.log("没有数据");
        this.getFlag = false;//禁止加载
        if (pageModel.pageIndex == 1) {
          this.coursel = res;
        }
        return;
      }

      this.scrollService.setModel(pageModel);
      if (pageModel.pageIndex == 1) {
        this.coursel = res;
        return;
      }
      this.coursel = this.coursel.concat(res);
    });
  }
  clickLi(i) {
    i = i + 1;
    if (this.liActive.index == i && this.ulMenu) {
      this.ulMenu = false;
      this.liActive.menuHeight = 0;
      return;
    }
    this.liActive.index = (i);//选中菜单 
    this.ulMenu = true;
    this.subValue = this.lilist.find(a => a.id == i).subValue;
    const bodyh = document.body.clientHeight || document.documentElement.clientHeight;//浏览器高度
    const ulHeight = 46 * this.subValue.length;
    if (ulHeight > (bodyh - 70)) {
      this.liActive.menuHeight = bodyh - (46 * 3);
    }
    else {
      this.liActive.menuHeight = ulHeight;
    }
    //this.liActive.menuHeight = 46 * this.subValue.length;
  }
  clickSubli(name) {

    console.log(name);
    let isCheckedSub = this.lilist.find(a => a.id == this.liActive.index);
    for (let i in isCheckedSub.subValue) {
      if (isCheckedSub.subValue[i].value == name) {
        isCheckedSub.subValue[i].isChecked = !isCheckedSub.subValue[i].isChecked;
        this.whereMethod(isCheckedSub.id, isCheckedSub.subValue[i].isChecked ? isCheckedSub.subValue[i].value : 0);
        //加载数据
        this.GetElectiveCenter(true);
      }
      else {
        isCheckedSub.subValue[i].isChecked = false;
      }
    }
    this.ulMenu = false;
    this.liActive.menuHeight = 0;
    setTimeout(() => {
      this.ulMenu = false;
      this.liActive.menuHeight = 0;
    }, 1);
  }
  clickLiTwo(i) {
    this.liActive.indexTwo = (i + 1);//选中菜单
    this.reqCourse.i_orderby = i;

    if (i == 3) {
      if (this.icon == 0) {
        this.reqCourse.i_orderType = 1;
        this.icon = 1;
      }
      else {
        this.reqCourse.i_orderType = (this.icon - 1);
        this.icon = (this.icon == 2 ? 1 : 2);
        console.log((this.icon == 2 ? 1 : 0), this.icon, this.reqCourse.i_orderType);
      }
    } else this.icon = this.reqCourse.i_orderType = 0
    this.GetElectiveCenter(true);
  }
  whereMethod(i, value) {
    switch (i) {
      case 1: //区域
        this.reqCourse.i_course_circle = value;
        break;
      case 2: //学段
        this.reqCourse.i_study_section = value;
        break;
      case 3: //年级
        this.reqCourse.i_grade = value;
        break;
      case 4://科目
        this.reqCourse.i_subject = value;
        break;
    }
  }
  changeSearch(value) {
    this.reqCourse.courseName = value;
    this.GetElectiveCenter(true);
    console.log(value);
  }
}
