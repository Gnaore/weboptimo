import { Component } from '@angular/core';

@Component({
  selector: 'app-qr-bordereau',
  templateUrl: './qr-bordereau.component.html',
  styleUrls: ['./qr-bordereau.component.scss']
})
export class QrBordereauComponent {
  hideAllTreeview: boolean = false;

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
