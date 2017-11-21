import { Component, OnInit, AfterViewInit, ViewChild, OnChanges, SimpleChange } from '@angular/core';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent {

  public queNext(dud: boolean) {
    console.log('user is done!');
   }

}
