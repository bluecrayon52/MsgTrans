import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {

  private xValue = new  BehaviorSubject<number>(0);
  x_value = this.xValue.asObservable();

  private xBValue = new  BehaviorSubject<number>(0);
  xB_value = this.xBValue.asObservable();

  constructor() {
  }

  getxValue() {
    return this.xValue.getValue();
  }

  changexValue(x: number) {
    this.xValue.next(x);
  }

  getxBValue() {
    return this.xValue.getValue();
  }

  changexBValue(xB: number) {
    this.xBValue.next(xB);
  }

}
