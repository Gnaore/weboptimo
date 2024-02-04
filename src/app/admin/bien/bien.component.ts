import { Component } from '@angular/core';

@Component({
  selector: 'app-bien',
  templateUrl: './bien.component.html',
  styleUrls: ['./bien.component.scss']
})
export class BienComponent {
  showModalEdit: boolean = false;
  selectedLocalisation: any;
}
