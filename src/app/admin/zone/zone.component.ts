import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IZone } from 'src/app/interfaces/zone';
import { ZoneService } from 'src/app/services/zone.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss']
})
export class ZoneComponent implements OnInit {
  showModalEdit: boolean = false;
  fbuilder = inject(FormBuilder);
  zoneService = inject(ZoneService);
  zoneForm!: FormGroup;
  zones: IZone[] = [];
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
  }

  formInit() {
    this.zoneForm = this.fbuilder.group({
      id: [''],
      code: ['', [Validators.required]],
      libelle: ['', [Validators.required]]
    });
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
          this.Toast.fire({
            timer: 10000,
            icon: "error",
            title: response.message
          });
        }
      }
    )
  }

  enregistrerZone() {
    this.chargement = true;
    const body: IZone = {
      id: this.zoneForm.value.id,
      code: this.zoneForm.value.code,
      libelle: this.zoneForm.value.libelle
    }
    if (!body.id) {
      this.zoneService.create(body).subscribe(
        {
          next: response => {
            this.chargement = false;
            this.listeZone();
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
    } else {
      this.zoneService.update(body, body.id).subscribe(
        {
          next: response => {
            this.chargement = false;
            this.showModalEdit = false;
            this.listeZone();
            this.formInit();
            this.Toast.fire({
              icon: "success",
              title: "Zone modifiée avec succès"
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

  obtenirDonneesZone(zone: IZone) {
    this.zoneForm.patchValue({
      id: zone.id,
      code: zone.code,
      libelle: zone.libelle
    })
  }

  supprimerZone(zoneId: number) {
    this.chargementSuppr = true;
    this.zoneService.delete(zoneId).subscribe(
      {
        next: response => {
          this.chargementSuppr = false;
          this.listeZone();
          this.Toast.fire({
            icon: "success",
            title: "Zone supprimée avec succès"
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
