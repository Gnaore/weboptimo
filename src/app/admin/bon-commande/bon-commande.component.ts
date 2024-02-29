import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBonCommande } from 'src/app/interfaces/bon-commande';
import { IFournisseur } from 'src/app/interfaces/fournisseur';
import { BonCommandeService } from 'src/app/services/bon-commande.service';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bon-commande',
  templateUrl: './bon-commande.component.html',
  styleUrls: ['./bon-commande.component.scss']
})
export class BonCommandeComponent {
  showModalEdit: any;
  selectedFournisseur: IFournisseur;
  fbuilder = inject(FormBuilder);
  bonCommandeService = inject(BonCommandeService);
  fournisseurService = inject(FournisseurService);
  bonCommandeForm: FormGroup;
  fournisseurs: IFournisseur[] = [];
  bonsCommandes: IBonCommande[] = [];
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
    this.listeBonCommande();
    this.listeFournisseur();
  }

  formInit() {
    this.bonCommandeForm = this.fbuilder.group({
      id: [''],
      numero_bc: ['', Validators.required],
      intitule: ['', [Validators.required]],
      date: ['', [Validators.required]],
      montant: ['', [Validators.required]],
      note: ['', [Validators.required]],
      piece_jointe: ['']
    });
    this.selectedFournisseur = undefined;
  }

  listeFournisseur() {
    this.fournisseurService.read().subscribe(
      {
        next: response => {
          this.fournisseurs = response;
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

  listeBonCommande() {
    this.chargement = true;
    this.bonCommandeService.read().subscribe(
      {
        next: response => {
          this.bonsCommandes = response;
          this.chargement = false;
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

  enregistrerBonCOmmande() {
    this.chargement = true;
    const body: IBonCommande = {
      id: this.bonCommandeForm.value.id,
      fournisseurId: this.selectedFournisseur.id,
      numero_bc: this.bonCommandeForm.value.numero_bc,
      intitule: this.bonCommandeForm.value.intitule,
      date: this.bonCommandeForm.value.date,
      montant: this.bonCommandeForm.value.montant,
      note: this.bonCommandeForm.value.note,
      piece_jointe: this.bonCommandeForm.value.piece_jointe
    }
    if (!body.id) {
      this.bonCommandeService.create(body).subscribe(
        {
          next: response => {
            this.chargement = false;
            this.listeBonCommande();
            this.formInit();
            this.Toast.fire({
              icon: "success",
              title: "Bon de commande créé avec succès"
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
      this.bonCommandeService.update(body, body.id).subscribe(
        {
          next: response => {
            this.chargement = false;
            this.showModalEdit = false;
            this.listeBonCommande();
            this.formInit();
            this.Toast.fire({
              icon: "success",
              title: "Bon de commande modifié avec succès"
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

  obtenirDonneesBonCommande(bonCommande: IBonCommande) {
    this.bonCommandeForm.patchValue({
      id: bonCommande.id,
      fournisseurId: bonCommande.fournisseurId,
      numero_bc: bonCommande.numero_bc,
      intitule: bonCommande.intitule,
      date: bonCommande.date,
      montant: bonCommande.montant,
      note: bonCommande.note,
      piece_jointe: bonCommande.piece_jointe
    });
    this.selectedFournisseur = bonCommande.fournisseur;
  }

  supprimerBonCommande(bcid: number) {
    this.chargementSuppr = true;
    this.bonCommandeService.delete(bcid).subscribe(
      {
        next: response => {
          this.chargementSuppr = false;
          this.listeBonCommande();
          this.Toast.fire({
            icon: "success",
            title: "Bon de commande retiré avec succès"
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
