import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IFamille } from 'src/app/interfaces/famille';
import { FamilleService } from 'src/app/services/famille.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-famille',
  templateUrl: './famille.component.html',
  styleUrls: ['./famille.component.scss']
})
export class FamilleComponent {
  showModalEdit: boolean = false;
  fbuilder = inject(FormBuilder);
  familleService = inject(FamilleService);
  familleForm!: FormGroup;
  familles: IFamille[] = [];
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
    this.listeFamille();
  }

  formInit() {
    this.familleForm = this.fbuilder.group({
      id: [''],
      code: ['', [Validators.required]],
      libelle: ['', [Validators.required]]
    });
  }

  listeFamille() {
    this.chargement = true;
    this.familleService.read().subscribe(
      {
        next: response => {
          this.chargement = false;
          this.familles = response;
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

  enregistrerFamille() {
    this.chargement = true;
    const body: IFamille = {
      id: this.familleForm.value.id,
      code: this.familleForm.value.code,
      libelle: this.familleForm.value.libelle
    }
    if (!body.id) {
      this.familleService.create(body).subscribe(
        {
          next: response => {
            this.chargement = false;
            this.listeFamille();
            this.formInit();
            this.Toast.fire({
              icon: "success",
              title: "Famille créée avec succès"
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
      this.familleService.update(body, body.id).subscribe(
        {
          next: response => {
            this.chargement = false;
            this.showModalEdit = false;
            this.listeFamille();
            this.formInit();
            this.Toast.fire({
              icon: "success",
              title: "Famille modifiée avec succès"
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

  obtenirDonneesFamille(famille: IFamille) {
    this.familleForm.patchValue({
      id: famille.id,
      code: famille.code,
      libelle: famille.libelle
    })
  }

  supprimerFamille(familleId: number) {
    this.chargementSuppr = true;
    this.familleService.delete(familleId).subscribe(
      {
        next: response => {
          this.chargementSuppr = false;
          this.listeFamille();
          this.Toast.fire({
            icon: "success",
            title: "Famille supprimée avec succès"
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
