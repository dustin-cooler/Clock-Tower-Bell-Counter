import { Component, OnInit, Directive, ViewChild, ElementRef } from '@angular/core';
import { ClockTower } from './clock-tower';

declare var $: any;

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <div class="row">
        <div class="col s12 l8 offset-l2 main-content z-depth-2 white">
          <div class="row">
            <div class="col s12">
              The clock tower will ring its bells <span class="bells blue-text text-darken-3">{{bells}}</span> times between
            </div>
            <div class="input-field col s12 m5 l4 offset-l1">
              <input #startTime id="startTime" type="text" class="timepicker" (change)="onChange()">
              <label for="startTime">Start Time</label>
            </div>
            <div class="input-field col s12 m2">
              and
            </div>
            <div class="input-field col s12 m5 l4">
              <input #endTime id="endTime" type="text" class="timepicker" (change)="onChange()">
              <label for="endTime">End Time</label>
            </div>
            <div class="col s12 m6">
              <a href="#">Clock Tower class</a>
            </div>
            <div class="col s12 m6">
              <a href="#">Full Source</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('startTime') starttime: ElementRef
  @ViewChild('endTime') endtime: ElementRef

  bells: number;

  constructor() {
    this.bells = 0;
    this.onChange = this.onChange.bind(this);
    this.onPickerHidden = this.onPickerHidden.bind(this);
  }

  onChange() {
    let tower = new ClockTower();
    this.bells = tower.countBells(this.starttime.nativeElement.value, this.endtime.nativeElement.value)
  }

  onPickerHidden() {
    setTimeout(this.onChange, 1);
  }

  ngOnInit() {
    $(this.starttime.nativeElement).pickatime({
      default: 'now',
      fromnow: 0,
      twelvehour: false,
      donetext: 'OK',
      cleartext: 'Clear',
      canceltext: 'Cancel',
      autoclose: false,
      ampmclickable: true,
      afterHide: this.onPickerHidden
    });
    $(this.endtime.nativeElement).pickatime({
      default: 'now',
      fromnow: 0,
      twelvehour: false,
      donetext: 'OK',
      cleartext: 'Clear',
      canceltext: 'Cancel',
      autoclose: false,
      ampmclickable: true,
      afterHide: this.onPickerHidden
    });
  }
}
