import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IGroupe } from 'src/app/interfaces/groupe';
import { IPermission } from 'src/app/interfaces/permission';
import { IUtilisateur } from 'src/app/interfaces/utilisateur';
import { GroupeService } from 'src/app/services/groupe.service';
import { PermissionService } from 'src/app/services/permission.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent implements OnInit {
  showModalEdit: boolean = false;
  showModalAccess: boolean = false;
  fbuilder = inject(FormBuilder);
  groupeService = inject(GroupeService);
  utilisateurService = inject(UtilisateurService);
  permissionService = inject(PermissionService);
  utilisateurForm!: FormGroup;
  groupes: IGroupe[] = [];
  utilisateurs: IUtilisateur[] = [];
  grp: IGroupe | undefined;
  permissions: IPermission[] = [];
  chargement: boolean = false;
  chargementSuppr: boolean = false;
  selectedGroup: IGroupe;

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
    this.listeGroupe();
    this.listePermission();
    this.listeUtilisateur();
  }

  formInit() {
    this.utilisateurForm = this.fbuilder.group({
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
          this.Toast.fire({
            timer: 10000,
            icon: "error",
            title: response.message
          });
        }
      }
    )
  }

  listeUtilisateur() {
    this.chargement = true;
    this.utilisateurService.read().subscribe(
      {
        next: response => {
          this.chargement = false;
          this.utilisateurs = response;
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
          this.Toast.fire({
            timer: 10000,
            icon: "error",
            title: response.message
          });
        }
      }
    )
  }

  enregistrerUtilisateur() {
    this.chargement = true;
    const body: IGroupe = {
      id: this.utilisateurForm.value.id,
      name: this.utilisateurForm.value.name
    }
    if (!body.id) {
      this.utilisateurService.create(body).subscribe(
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
            this.Toast.fire({
              timer: 10000,
              icon: "error",
              title: response.message
            });
          }
        }
      );
    } else {
      this.utilisateurService.update(body, body.id).subscribe(
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

  obtenirDonneesUtilisateur(utilisateur: IUtilisateur) {
    this.utilisateurForm.patchValue({
      name: utilisateur.firstname,
      id: utilisateur.id
    })
  }

  supprimerUtilisateur(utilisateurId: number) {
    this.chargementSuppr = true;
    this.groupeService.delete(utilisateurId).subscribe(
      {
        next: response => {
          this.chargementSuppr = false;
          this.listeGroupe();
          this.Toast.fire({
            icon: "success",
            title: "Utilisateur supprimé avec succès"
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
