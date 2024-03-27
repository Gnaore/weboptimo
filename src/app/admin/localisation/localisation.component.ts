import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILocalisation } from 'src/app/interfaces/localisation';
import { ISite } from 'src/app/interfaces/site';
import { LocalisationService } from 'src/app/services/localisation.service';
import { SiteService } from 'src/app/services/site.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-localisation',
  templateUrl: './localisation.component.html',
  styleUrls: ['./localisation.component.scss']
})
export class LocalisationComponent {
  showModalEdit: boolean = false;
  selectedSite: ISite | undefined;
  fbuilder = inject(FormBuilder);
  localisationService = inject(LocalisationService);
  siteService = inject(SiteService);
  localisationForm: FormGroup;
  localisations: ILocalisation[] = [];
  sites: ISite[] = [];
  chargement: boolean = false;
  chargementSuppr: boolean = false;
  fields = ["code", "id", "libelle", "site_id", "message"];

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
    this.listeLocalisation();
    this.listeSite();
  }

  formInit() {
    this.localisationForm = this.fbuilder.group({
      id: [''],
      code: ['', [Validators.required, Validators.minLength(7)]],
      libelle: ['', [Validators.required]]
    });
    this.localisationForm.get('code').disable();
    this.selectedSite = undefined;
  }

  listeLocalisation() {
    this.chargement = true;
    this.localisationService.read().subscribe(
      {
        next: response => {
          this.chargement = false;
          this.localisations = response;
        },
        error: response => {
          this.chargement = false;
          this.fields.forEach(field => {
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
          this.fields.forEach(field => {
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
    )
  }

  genererCode() {
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
    if (!body.id) {
      this.localisationService.create(body).subscribe(
        {
          next: response => {
            this.chargement = false;
            this.listeLocalisation();
            this.formInit();
            this.Toast.fire({
              icon: "success",
              title: "Localisation créée avec succès"
            });
          },
          error: response => {
            this.chargement = false;
            this.fields.forEach(field => {
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
    } else {
      this.localisationService.update(body, body.id).subscribe(
        {
          next: response => {
            this.chargement = false;
            this.showModalEdit = false;
            this.listeLocalisation();
            this.formInit();
            this.Toast.fire({
              icon: "success",
              title: "Localisation modifiée avec succès"
            });
          },
          error: response => {
            this.chargement = false;
            this.fields.forEach(field => {
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
  }

  obtenirDonneesLocalisation(localisation: ILocalisation) {
    this.localisationForm.patchValue({
      id: localisation.id,
      code: localisation.code,
      libelle: localisation.libelle
    });
    this.selectedSite = this.sites.find(site => site.id === localisation.site_id);
  }

  supprimerLocalisation(lid: number) {
    this.chargementSuppr = true;
    this.localisationService.delete(lid).subscribe(
      {
        next: response => {
          this.chargementSuppr = false;
          this.listeLocalisation();
          this.Toast.fire({
            icon: "success",
            title: "Localisation supprimée avec succès"
          });
        },
        error: response => {
          this.chargementSuppr = false;
          this.fields.forEach(field => {
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
    )
  }
}
