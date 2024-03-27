import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IFournisseur } from 'src/app/interfaces/fournisseur';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.scss']
})
export class FournisseurComponent {
  showModalEdit: boolean = false;
  selectedType: any;
  selectedGroupe: any;
  fbuilder = inject(FormBuilder);
  fournisseurService = inject(FournisseurService);
  fournisseurForm: FormGroup;
  fournisseurs: IFournisseur[] = [];
  chargement: boolean = false;
  chargementSuppr: boolean = false;
  fields = ["id", "code", "fournisseur", "message"];

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
    this.listeFournisseur();
  }

  formInit() {
    this.fournisseurForm = this.fbuilder.group({
      id: [''],
      code: [''],
      fournisseur: ['', [Validators.required]],
      first_contact: ['', [Validators.required]],
      second_contact: ['', [Validators.required]],
      email: ['', [Validators.required]],
      compte: ['', [Validators.required]]
    });
    this.fournisseurForm.get('code').disable();
    this.selectedGroupe = undefined;
    this.selectedType = undefined;
  }

  listeFournisseur() {
    this.chargement = true;
    this.fournisseurService.read().subscribe(
      {
        next: response => {
          this.chargement = false;
          this.fournisseurs = response;
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

  enregistrerFournisseur() {
    this.chargement = true;
    const body: IFournisseur = {
      id: this.fournisseurForm.value.id,
      code: this.fournisseurForm.value.code,
      fournisseur: this.fournisseurForm.value.fournisseur,
      first_contact: this.fournisseurForm.value.first_contact,
      second_contact: this.fournisseurForm.value.second_contact,
      compte: this.fournisseurForm.value.compte,
      groupe: this.selectedGroupe,
      type: this.selectedType,
      email: this.fournisseurForm.value.email,
      adresse: this.fournisseurForm.value.adresse
    }
    if (!body.id) {
      this.fournisseurService.create(body).subscribe(
        {
          next: response => {
            this.chargement = false;
            this.listeFournisseur();
            this.formInit();
            this.Toast.fire({
              icon: "success",
              title: "Fournisseur ajouté avec succès"
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
      this.fournisseurService.update(body, body.id).subscribe(
        {
          next: response => {
            this.chargement = false;
            this.showModalEdit = false;
            this.listeFournisseur();
            this.formInit();
            this.Toast.fire({
              icon: "success",
              title: "Fournisseur modifié avec succès"
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

  obtenirDonneesfournisseur(fournisseur: IFournisseur) {
    this.fournisseurForm.patchValue({
      id: fournisseur.id,
      code: fournisseur.code,
      fournisseur: fournisseur.fournisseur,
      first_contact: fournisseur.first_contact,
      second_contact: fournisseur.second_contact,
      compte: fournisseur.compte,
      email: fournisseur.email,
      adresse: fournisseur.adresse,
    });
    this.selectedGroupe = fournisseur.groupe;
    this.selectedType = fournisseur.type;
  }

  supprimerFournisseur(fid: number) {
    this.chargementSuppr = true;
    this.fournisseurService.delete(fid).subscribe(
      {
        next: response => {
          this.chargementSuppr = false;
          this.listeFournisseur();
          this.Toast.fire({
            icon: "success",
            title: "Fournisseur retiré avec succès"
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
