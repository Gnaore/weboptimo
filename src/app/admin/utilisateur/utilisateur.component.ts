import { Component } from '@angular/core';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent {
  showModalEdit: boolean = false;
  showModalAccess: boolean = false;
  value: { desc: string }[] = [
    { desc: 'gdhhd' },
    { desc: 'gdhhd' },
    { desc: 'gdhhd' },
    { desc: 'gdhhd' },
    { desc: 'gdhhd' },
    { desc: 'gdhhd' },
    { desc: 'gdhhd' },
    { desc: 'gdhhd' },
    { desc: 'gdhhd' },
    { desc: 'gdhhd' },
    { desc: 'gdhhd' },
    { desc: 'gdhhd' },
    { desc: 'gdhhd' },
    { desc: 'gdhhd' },
    { desc: 'gdhhd' },
    { desc: 'gdhhd' },
    { desc: 'gdhhd' },
    { desc: 'gdhhd' },
    { desc: 'gdhhd' },
    { desc: 'gdhhd' },
  ];
  selectedGroup: any;
}
