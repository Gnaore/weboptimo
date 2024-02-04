import { Component } from '@angular/core';

@Component({
  selector: 'app-bon-commande',
  templateUrl: './bon-commande.component.html',
  styleUrls: ['./bon-commande.component.scss']
})
export class BonCommandeComponent {
  showModalEdit: any;
  selectedFournisseur: any;
}
