import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBordereau } from 'src/app/interfaces/bordereau';
import { ISite } from 'src/app/interfaces/site';
import { BordereauService } from 'src/app/services/bordereau.service';
import { SiteService } from 'src/app/services/site.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bordereau',
  templateUrl: './bordereau.component.html',
  styleUrls: ['./bordereau.component.scss']
})
export class BordereauComponent {
  showModalEdit: boolean = false;
  selectedSite: ISite | undefined;
  fbuilder = inject(FormBuilder);
  bordereauService = inject(BordereauService);
  siteService = inject(SiteService);
  bordereauForm: FormGroup;
  bordereaux: IBordereau[] = [];
  sites: ISite[] = [];
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
    this.listeBordereau();
    this.listeSite();
  }

  formInit() {
    this.bordereauForm = this.fbuilder.group({
      id: [''],
      code: ['', [Validators.required, Validators.minLength(8)]],
      libelle: ['', [Validators.required]]
    });
    this.bordereauForm.get('code').disable();
    this.selectedSite = undefined;
  }

  listeBordereau() {
    this.chargement = true;
    this.bordereauService.read().subscribe(
      {
        next: response => {
          this.chargement = false;
          this.bordereaux = response;
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
    )
  }

  listeSite() {
    this.chargement = true;
    this.siteService.read().subscribe(
      {
        next: response => {
          this.chargement = false;
          this.sites = response;
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
    )
  }

  genererCode() {
    const year = new Date().getFullYear().toString();
    console.log(year.substring(year.length - 2));
    
    const nbrBorParSite = this.bordereaux.filter(bord => bord.site_code === this.selectedSite.code && bord.code.substring(0,1) === year.substring(year.length - 2)).length + 1;
    if (nbrBorParSite > 9)
      this.bordereauForm.get('code').setValue(year.substring(year.length - 2) + this.selectedSite.code + '' + nbrBorParSite)
    else  
      this.bordereauForm.get('code').setValue(year.substring(year.length - 2) + this.selectedSite.code + '0' + nbrBorParSite)
  }

  enregistrerLocalisation() {
    this.chargement = true;
    const body: IBordereau = {
      id: this.bordereauForm.value.id,
      code: this.bordereauForm.value.code,
      libelle: this.bordereauForm.value.libelle,
      site_code: this.selectedSite.code
    }
    if (!body.id) {
      this.bordereauService.create(body).subscribe(
        {
          next: response => {
            this.chargement = false;
            this.listeBordereau();
            this.formInit();
            this.Toast.fire({
              icon: "success",
              title: "Bordereau créé avec succès"
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
    } else {
      this.bordereauService.update(body, body.id).subscribe(
        {
          next: response => {
            this.chargement = false;
            this.showModalEdit = false;
            this.listeBordereau();
            this.formInit();
            this.Toast.fire({
              icon: "success",
              title: "Bordereau modifié avec succès"
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
  }

  getSiteLabel(siteCode: string): string {
    return this.sites.find(site => site.code === siteCode).libelle
  }

  obtenirDonneesBordereau(bordereau: IBordereau) {
    this.bordereauForm.patchValue({
      id: bordereau.id,
      code: bordereau.code,
      libelle: bordereau.libelle
    });
    this.selectedSite = this.sites.find(site => site.code === bordereau.site_code);
  }

  supprimerBordereau(bid: number) {
    this.chargementSuppr = true;
    this.bordereauService.delete(bid).subscribe(
      {
        next: response => {
          this.chargementSuppr = false;
          this.listeBordereau();
          this.Toast.fire({
            icon: "success",
            title: "Bordereau supprimé avec succès"
          });
        },
        error: response => {
          this.chargementSuppr = false;
          this.Toast.fire({
            timer: 10000,
            icon: "error",
            title: response.message
          });
        }
      }
    )
  }
}
