import { Component, OnInit, inject } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Columns } from '../importation/importation.component';
import { IZone } from 'src/app/interfaces/zone';
import { ISite } from 'src/app/interfaces/site';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZoneService } from 'src/app/services/zone.service';
import Swal from 'sweetalert2';
import { SiteService } from 'src/app/services/site.service';
import { LocalisationService } from 'src/app/services/localisation.service';
import { ILocalisation } from 'src/app/interfaces/localisation';
import { IBien } from 'src/app/interfaces/bien';
import { BienService } from 'src/app/services/bien.service';

@Component({
  selector: 'app-emplacement',
  templateUrl: './emplacement.component.html',
  styleUrls: ['./emplacement.component.scss']
})
export class EmplacementComponent implements OnInit {
  files: TreeNode[];
  selectedZone: IZone;
  selectedSite: ISite;
  showModalZone: boolean = false;
  showModalSite: boolean = false;
  showModalLocalisation: boolean = false;
  hideAllTreeview: boolean = false;
  fbuilder = inject(FormBuilder);
  zoneService = inject(ZoneService);
  localisationService = inject(LocalisationService);
  siteService = inject(SiteService);
  zoneForm!: FormGroup;
  siteForm!: FormGroup;
  localisationForm: FormGroup;
  zones: IZone[] = [];
  sites: ISite[] = [];
  localisations: ILocalisation[] = [];
  chargement: boolean = false;
  chargementSuppr: boolean = false;
  bienService = inject(BienService);
  biens: IBien[] = [];
  biensFiltres: IBien[] = [];

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
    this.formInit();
    this.listeZone();
    this.listeSite();
    this.listeBien();
    this.listeLocalisation();
  }

  listeBien() {
    this.chargement = true;
    this.bienService.read().subscribe(
      {
        next: response => {
          this.chargement = false;
          this.biens = response;
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

  filtreBien(by: 'site' | 'zone' | 'localisation', id: number) {
    console.log("affichage par : " + by + " avec id : " + id);
    
    switch (by) {
      case 'site':
        this.biensFiltres = this.biens.filter(bien => bien.localisation.site_id === id);
        break;
      case 'localisation':
        this.biensFiltres = this.biens.filter(bien => bien.localisation.id === id);
        break;
      case 'zone':
        this.biensFiltres = this.biens.filter(bien => bien.localisation_id === id);
        break;
      default:
        this.biensFiltres = [];
        break;
    }
  }

  formInit() {
    this.zoneForm = this.fbuilder.group({
      id: [''],
      code: ['', [Validators.required]],
      libelle: ['', [Validators.required]]
    });
    this.siteForm = this.fbuilder.group({
      id: [''],
      code: ['', [Validators.required, Validators.minLength(4)]],
      libelle: ['', [Validators.required]]
    });
    this.siteForm.get('code').disable();
    this.selectedZone = undefined;
    this.localisationForm = this.fbuilder.group({
      id: [''],
      code: ['', [Validators.required, Validators.minLength(7)]],
      libelle: ['', [Validators.required]]
    });
    this.localisationForm.get('code').disable();
    this.selectedSite = undefined;
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

  listeLocalisation() {
    this.localisationService.read().subscribe(
      {
        next: response => {
          this.localisations = response;
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

  listeLocalisationParSite(idSite: number): ILocalisation[] {
    return this.localisations.filter((item) => item.site_id === idSite);
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

  genererCodeSite() {
    const nbrSiteParZone = this.sites.filter(site => site.zone_id === this.selectedZone.id).length + 1;
    if (nbrSiteParZone > 9)
      this.siteForm.get('code').setValue(this.selectedZone.code + '' + nbrSiteParZone)
    else
      this.siteForm.get('code').setValue(this.selectedZone.code + '0' + nbrSiteParZone)
  }

  genererCodeLocalisation() {
    const nbrLocParSite = this.localisations.filter(loc => loc.site_id === this.selectedSite.id).length + 1;
    if (nbrLocParSite > 99)
      this.localisationForm.get('code').setValue(this.selectedSite.code + '' + nbrLocParSite)
    else if (nbrLocParSite > 9)
      this.localisationForm.get('code').setValue(this.selectedSite.code + '0' + nbrLocParSite)
    else
      this.localisationForm.get('code').setValue(this.selectedSite.code + '00' + nbrLocParSite)
  }

  enregistrerLocalisation() {
    this.chargement = true;
    const body: ILocalisation = {
      id: this.localisationForm.value.id,
      code: this.localisationForm.get('code').value,
      libelle: this.localisationForm.value.libelle,
      site_id: this.selectedSite.id
    }
    this.localisationService.create(body).subscribe(
      {
        next: response => {
          this.chargement = false;
          this.formInit();
          this.Toast.fire({
            icon: "success",
            title: "Localisation créée avec succès"
          });
        },
        error: response => {
          this.chargement = false;
          const fields = ['id', 'code', 'libelle', 'site_id', 'message'];
          fields.forEach(field => {
            if (response.error[field]) {
              this.Toast.fire({
                timer: 10000,
                icon: "error",
                title: response.error[field]
              });
            }
          })
        }
      }
    );
  }

  enregistrerSite() {
    this.chargement = true;
    const body: ISite = {
      id: this.siteForm.value.id,
      code: this.siteForm.get('code').value,
      libelle: this.siteForm.value.libelle,
      zone_id: this.selectedZone.id
    }
    this.siteService.create(body).subscribe(
      {
        next: response => {
          this.chargement = false;
          this.listeSite();
          this.formInit();
          this.Toast.fire({
            icon: "success",
            title: "Site créé avec succès"
          });
        },
        error: response => {
          this.chargement = false;
          const fields = ['id', 'code', 'libelle', 'zone_id', 'message'];
          fields.forEach(field => {
            if (response.error[field]) {
              this.Toast.fire({
                timer: 10000,
                icon: "error",
                title: response.error[field]
              });
            }
          })
        }
      }
    );
  }

  enregistrerZone() {
    this.chargement = true;
    const body: IZone = {
      id: this.zoneForm.value.id,
      code: this.zoneForm.value.code,
      libelle: this.zoneForm.value.libelle
    }
    this.zoneService.create(body).subscribe(
      {
        next: response => {
          this.chargement = false;
          this.formInit();
          this.Toast.fire({
            icon: "success",
            title: "Zone créée avec succès"
          });
        },
        error: response => {
          this.chargement = false;
          const fields = ['id', 'code', 'libelle', 'message'];
          fields.forEach(field => {
            if (response.error[field]) {
              this.Toast.fire({
                timer: 10000,
                icon: "error",
                title: response.error[field]
              });
            }
          })
        }
      }
    );
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
