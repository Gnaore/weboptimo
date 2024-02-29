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

@Component({
  selector: 'app-emplacement',
  templateUrl: './emplacement.component.html',
  styleUrls: ['./emplacement.component.scss']
})
export class EmplacementComponent implements OnInit {
  files: TreeNode[];
  selectedColumns: Columns[] | undefined;
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
    this.listeLocalisation();
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
          this.Toast.fire({
            timer: 10000,
            icon: "error",
            title: response.message
          });
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
          this.Toast.fire({
            timer: 10000,
            icon: "error",
            title: response.message
          });
        }
      }
    )
  }

  listeSite() {
    this.siteService.read().subscribe(
      {
        next: response => {
          this.sites = response;
        },
        error: response => {
          this.Toast.fire({
            timer: 10000,
            icon: "error",
            title: response.message
          });
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
      code: this.localisationForm.value.code,
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
          this.Toast.fire({
            timer: 10000,
            icon: "error",
            title: response.message
          });
        }
      }
    );
  }

  enregistrerSite() {
    this.chargement = true;
    const body: ISite = {
      id: this.siteForm.value.id,
      code: this.siteForm.value.code,
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
          this.Toast.fire({
            timer: 10000,
            icon: "error",
            title: response.message
          });
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
          this.Toast.fire({
            timer: 10000,
            icon: "error",
            title: response.message
          });
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
