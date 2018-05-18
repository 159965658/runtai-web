import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-addinput',
  templateUrl: './addinput.component.html',
  styleUrls: ['./addinput.component.css']
})
export class AddinputComponent implements OnInit {

  constructor(private fb: FormBuilder) { }
  style: any = {
    top: 'calc(100% - 50px)',
    'background-color': 'transparent',
    'transform-origin': '0px 0px 0px !important'
  };

  formModel: FormGroup;
  inputValue = ''
  @Input() isInput;
  @ViewChild('addInput') addInput;
  @Output() changeAddinput: EventEmitter<any> = new EventEmitter();
  ngOnInit() {
    this.formModel = this.fb.group({
      inputValue: [null, [Validators.required]]
    });
  }
  _console(value) {
    //console.log(value);
  }
  _inputFocus() {
    this.isInput = true;
    setTimeout(() => {
      this.addInput.nativeElement.focus()
    }, 500);
  }
  handleCancel = (e) => {
    this.isInput = false;
    //if (this.formModel.valid) {

    //   return;
    // } 
  }
  handleCancelC = () => {

    // if (e) {
    this.isInput = false;
    this.changeAddinput.emit(this.inputValue);
    this.inputValue = null;
    //}
    //if (this.formModel.valid) {

    //   return;
    // } 
  }
  handleOk = (e) => {

  }

}
