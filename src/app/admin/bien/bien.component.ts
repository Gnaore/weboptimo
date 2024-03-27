import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBien } from 'src/app/interfaces/bien';
import { ILocalisation } from 'src/app/interfaces/localisation';
import { BienService } from 'src/app/services/bien.service';
import { LocalisationService } from 'src/app/services/localisation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bien',
  templateUrl: './bien.component.html',
  styleUrls: ['./bien.component.scss']
})
export class BienComponent {
  showModalEdit: boolean = false;
  selectedLocalisation: ILocalisation;
  fbuilder = inject(FormBuilder);
  bienService = inject(BienService);
  localisationService = inject(LocalisationService);
  bienForm!: FormGroup;
  biens: IBien[] = [];
  localisations: ILocalisation[] = [];
  chargement: boolean = false;
  chargementSuppr: boolean = false;
  fields = ["id", "code_inventaire", "localisation_id", "description", "date_enregistrement", "libelle", "etat", "service", "reference"];
  

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
    this.listeBien();
    this.listeLocalisation();
  }

  formInit() {
    this.bienForm = this.fbuilder.group({
      id: [''],
      code_inventaire: ['', [Validators.required]],
      libelle: [''],
      description: ['', [Validators.required]],
      etat: [''],
      service: ['', [Validators.required]],
      reference: ['', [Validators.required]],
    });
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

  listeLocalisation() {
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

  enregistrerBien() {
    this.chargement = true;
    const body: Partial<IBien> = {
      id: this.bienForm.value.id,
      code_inventaire: this.bienForm.value.code_inventaire,
      localisation_id: this.selectedLocalisation.id,
      description: this.bienForm.value.description,
      etat: this.bienForm.value.etat,
      service: this.bienForm.value.service,
      libelle: this.bienForm.value.libelle,
      reference: this.bienForm.value.reference
    }
    this.bienService.update(body, body.id).subscribe(
      {
        next: response => {
          this.chargement = false;
          this.showModalEdit = false;
          this.listeBien();
          this.formInit();
          this.Toast.fire({
            icon: "success",
            title: "Bien modifié avec succès"
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

  obtenirDonneesBien(bien: IBien) {
    this.bienForm.patchValue({
      id: bien.id,
      site_id: bien.site_id,
      code_inventaire: bien.code_inventaire.code,
      description: bien.description,
      etat: bien.etat,
      service: bien.service,
      reference: bien.reference
    });
    this.selectedLocalisation = this.localisations.find(loc => loc.id === bien.localisation_id);
  }

  supprimerBien(bienId: number) {
    this.chargementSuppr = true;
    this.bienService.delete(bienId).subscribe(
      {
        next: response => {
          this.chargementSuppr = false;
          this.listeBien();
          this.Toast.fire({
            icon: "success",
            title: "Bien supprimé avec succès"
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
