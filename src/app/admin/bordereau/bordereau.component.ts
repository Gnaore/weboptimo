import { Component } from '@angular/core';

@Component({
  selector: 'app-bordereau',
  templateUrl: './bordereau.component.html',
  styleUrls: ['./bordereau.component.scss']
})
export class BordereauComponent {
  showModalEdit: boolean = false;
  selectedSite: any;
}
