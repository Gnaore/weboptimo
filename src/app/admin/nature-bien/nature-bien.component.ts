import { Component } from '@angular/core';

@Component({
  selector: 'app-nature-bien',
  templateUrl: './nature-bien.component.html',
  styleUrls: ['./nature-bien.component.scss']
})
export class NatureBienComponent {
  showModalEdit: boolean = false;
  selectedFamille: any;
  checked: boolean = false;
}
