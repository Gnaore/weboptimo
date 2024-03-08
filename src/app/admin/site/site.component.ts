import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISite } from 'src/app/interfaces/site';
import { IZone } from 'src/app/interfaces/zone';
import { SiteService } from 'src/app/services/site.service';
import { ZoneService } from 'src/app/services/zone.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent {
  showModalEdit: boolean = false;
  selectedZone: IZone | undefined;
  fbuilder = inject(FormBuilder);
  zoneService = inject(ZoneService);
  siteService = inject(SiteService);
  siteForm!: FormGroup;
  zones: IZone[] = [];
  sites: ISite[] = [];
  chargement: boolean = false;
  chargementSuppr: boolean = false;
  fields = ["code", "id", "libelle", "zone_id", "message"];

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
  }

  formInit() {
    this.siteForm = this.fbuilder.group({
      id: [''],
      code: ['', [Validators.required, Validators.minLength(4)]],
      libelle: ['', [Validators.required]]
    });
    this.siteForm.get('code').disable();
    this.selectedZone = undefined;
  }

  listeZone() {
    this.chargement = true;
    this.zoneService.read().subscribe(
      {
        next: response => {
          this.chargement = false;
          this.zones = response;
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
    const nbrSiteParZone = this.sites.filter(site => site.zone_id === this.selectedZone.id).length + 1;
    if (nbrSiteParZone > 9)
      this.siteForm.get('code').setValue(this.selectedZone.code + '' + nbrSiteParZone)
    else
      this.siteForm.get('code').setValue(this.selectedZone.code + '0' + nbrSiteParZone)  
  }

  enregistrerSite() {
    this.chargement = true;
    const body: ISite = {
      id: this.siteForm.value.id,
      code: this.siteForm.get('code').value,
      libelle: this.siteForm.value.libelle,
      zone_id: this.selectedZone.id
    }
    
    if (!body.id) {
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
      this.siteService.update(body, body.id).subscribe(
        {
          next: response => {
            this.chargement = false;
            this.showModalEdit = false;
            this.listeSite();
            this.formInit();
            this.Toast.fire({
              icon: "success",
              title: "Site modifié avec succès"
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

  obtenirDonneesSite(site: ISite) {
    this.siteForm.patchValue({
      id: site.id,
      code: site.code,
      libelle: site.libelle
    });
    this.selectedZone = this.zones.find(zone => zone.id === site.zone_id);
  }

  supprimerSite(sid: number) {
    this.chargementSuppr = true;
    this.siteService.delete(sid).subscribe(
      {
        next: response => {
          this.chargementSuppr = false;
          this.listeSite();
          this.Toast.fire({
            icon: "success",
            title: "Site supprimé avec succès"
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
