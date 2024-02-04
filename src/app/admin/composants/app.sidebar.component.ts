import {Component} from '@angular/core';
import {AppComponent} from '../../app.component';
import { AdminMainComponent } from '../admin-main/admin-main.component';

@Component({
    selector: 'app-sidebar',
      templateUrl: './app.sidebar.component.html'
})
export class AppSideBarComponent {

    constructor(public app: AppComponent, public appMain: AdminMainComponent) {}

}
