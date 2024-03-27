import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IGroupe } from 'src/app/interfaces/groupe';
import { IPermission } from 'src/app/interfaces/permission';
import { GroupeService } from 'src/app/services/groupe.service';
import { PermissionService } from 'src/app/services/permission.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-groupe',
  templateUrl: './groupe.component.html',
  styleUrls: ['./groupe.component.scss']
})
export class GroupeComponent implements OnInit {
  showModalEdit: boolean = false;
  showModalAccess: boolean = false;
  fbuilder = inject(FormBuilder);
  groupeService = inject(GroupeService);
  permissionService = inject(PermissionService);
  groupeForm!: FormGroup;
  groupes: IGroupe[] = [];
  grp: IGroupe | undefined;
  permissions: IPermission[] = [];
  chargement: boolean = false;
  chargementSuppr: boolean = false;
  fields = ["id", "name", "message"];

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
    this.listeGroupe();
    this.listePermission();
  }

  formInit() {
    this.groupeForm = this.fbuilder.group({
      id: [''],
      name: ['', [Validators.required]]
    });
  }

  listeGroupe() {
    this.chargement = true;
    this.groupeService.read().subscribe(
      {
        next: response => {
          this.chargement = false;
          this.groupes = response;
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

  listePermission() {
    this.chargement = true;
    this.permissionService.read().subscribe(
      {
        next: response => {
          this.chargement = false;
          this.permissions = response;
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

  enregistrerGroupe() {
    this.chargement = true;
    const body: IGroupe = {
      id: this.groupeForm.value.id,
      name: this.groupeForm.value.name
    }
    if (!body.id) {
      this.groupeService.create(body).subscribe(
        {
          next: response => {
            this.chargement = false;
            this.listeGroupe();
            this.formInit();
            this.Toast.fire({
              icon: "success",
              title: "Groupe créé avec succès"
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
      this.groupeService.update(body, body.id).subscribe(
        {
          next: response => {
            this.chargement = false;
            this.showModalEdit = false;
            this.listeGroupe();
            this.formInit();
            this.Toast.fire({
              icon: "success",
              title: "Groupe créé avec succès"
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

  obtenirDonneesGroupe(groupe: IGroupe) {
    this.groupeForm.patchValue({
      name: groupe.name,
      id: groupe.id
    })
  }

  supprimerGroupe(groupeId: number) {
    this.chargementSuppr = true;
    this.groupeService.delete(groupeId).subscribe(
      {
        next: response => {
          this.chargementSuppr = false;
          this.listeGroupe();
          this.Toast.fire({
            icon: "success",
            title: "Groupe supprimé avec succès"
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
