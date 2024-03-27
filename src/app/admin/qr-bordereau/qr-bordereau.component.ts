import { Component, inject } from '@angular/core';
import { IBien } from 'src/app/interfaces/bien';
import { IBordereau } from 'src/app/interfaces/bordereau';
import { ICodeInventaire } from 'src/app/interfaces/code-inventaire';
import { ISite } from 'src/app/interfaces/site';
import { IZone } from 'src/app/interfaces/zone';
import { BordereauService } from 'src/app/services/bordereau.service';
import { CodeInventaireService } from 'src/app/services/code-inventaire.service';
import { SiteService } from 'src/app/services/site.service';
import { ZoneService } from 'src/app/services/zone.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-qr-bordereau',
  templateUrl: './qr-bordereau.component.html',
  styleUrls: ['./qr-bordereau.component.scss']
})
export class QrBordereauComponent {
  hideAllTreeview: boolean = false;
  zones: IZone[] = [];
  sites: ISite[] = [];
  bordereaux: IBordereau[] = [];
  chargement: boolean = false;
  chargementSuppr: boolean = false;
  codeInventaireService = inject(CodeInventaireService);
  zoneService = inject(ZoneService);
  bordereauService = inject(BordereauService);
  siteService = inject(SiteService);
  codesInventaires: ICodeInventaire[] = [];
  codesInventairesFiltres: ICodeInventaire[] = [];
  codeBordereau: string = '';
  libelleSelection: string = 'Edition de bordereaux et de codesInventaires';
  idSite: number = 0;
  idZone: number = 0;
  nbrCode: number = 0;

  Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  ngOnInit(): void {
    this.listeZone();
    this.listeSite();
    this.listeCodeInventaire();
    this.listeBordereaux();
  }

  listeCodeInventaire() {
    this.chargement = true;
    this.codeInventaireService.read().subscribe(
      {
        next: response => {
          this.chargement = false;
          this.codesInventaires = response;
        },
        error: response => {
          this.chargement = false;
          this.Toast.fire({
            timer: 10000,
            icon: "error",
            title: response.error.message
          });
        }
      }
    )
  }

  filtreBien(by: 'site' | 'zone' | 'bordereau', id: number | string) {
    this.codeBordereau = '';
    switch (by) {
      case 'site':
        this.codesInventairesFiltres = this.codesInventaires.filter(code => code.bordereau_code === id);
        break;
      case 'bordereau':
        this.codeBordereau = id.toString();
        this.codesInventairesFiltres = this.codesInventaires.filter(code => code.bordereau_code === id);
        break;
      case 'zone':
        this.codesInventairesFiltres = this.codesInventaires.filter(code => code.bordereau_code === id);
        break;
      default:
        this.codesInventairesFiltres = [];
        break;
    }
    this.nbrCode = this.codesInventairesFiltres.length
  }

  listeZone() {
    this.zoneService.read().subscribe(
      {
        next: response => {
          this.zones = response;
        },
        error: response => {
          if (response.error['message']) {
            this.Toast.fire({
              timer: 10000,
              icon: "error",
              title: response.error['message']
            });
          }
        }
      }
    )
  }

  listeBordereaux() {
    this.bordereauService.read().subscribe(
      {
        next: response => {
          this.bordereaux = response;
        },
        error: response => {
          if (response.error['message']) {
            this.Toast.fire({
              timer: 10000,
              icon: "error",
              title: response.error['message']
            });
          }
        }
      }
    )
  }

  listeBordereauxParSite(code_site: string): IBordereau[] {
    return this.bordereaux.filter((item) => item.site_code === code_site);
  }

  listeSite() {
    this.siteService.read().subscribe(
      {
        next: response => {
          this.sites = response;
        },
        error: response => {
          if (response.error['message']) {
            this.Toast.fire({
              timer: 10000,
              icon: "error",
              title: response.error['message']
            });
          }
        }
      }
    )
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
