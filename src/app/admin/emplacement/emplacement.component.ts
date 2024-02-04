import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Columns } from '../importation/importation.component';

@Component({
  selector: 'app-emplacement',
  templateUrl: './emplacement.component.html',
  styleUrls: ['./emplacement.component.scss']
})
export class EmplacementComponent implements OnInit {
  files: TreeNode[];
  selectedColumns: Columns[] | undefined;
  selectedZone: any;
  selectedSite: any;
  showModalZone: boolean = false;
  showModalSite: boolean = false;
  showModalLocalisation: boolean = false;
  hideAllTreeview: boolean = false;

  ngOnInit(): void {
    this.selectedColumns = [
      { field: 'codeLocalisation', header: 'Code localisation' },
      { field: 'codeInventaire', header: 'Code inventaire' },
      { field: 'ref', header: 'Référence' },
      { field: 'description', header: 'Description' },
      { field: 'etat', header: 'Etat' },
      { field: 'service', header: 'Service' },
      { field: 'miseAuRebu', header: 'Mise au rebu' },
      { field: 'note', header: 'Note' },
      { field: 'estSupprime', header: 'Est supprimé' }
    ];
  }

  toggleTreeview(treeview: any) {
    treeview.target.nextElementSibling.classList.toggle('hide');
  }

  closeAllTreeviews() {
    this.hideAllTreeview = !this.hideAllTreeview;
    if (this.hideAllTreeview) {
      document.querySelectorAll('.sub-treeview').forEach(treeview => treeview.classList.add('hide'));
    } else {
      document.querySelectorAll('.sub-treeview').forEach(treeview => treeview.classList.remove('hide'));
    }
  }
}
