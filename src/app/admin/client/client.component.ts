import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IClient } from 'src/app/interfaces/client';
import { ClientService } from 'src/app/services/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent {
  showModalEdit: boolean = false;
  checked: boolean = false;
  fbuilder = inject(FormBuilder);
  clientService = inject(ClientService);
  clientForm: FormGroup;
  clients: IClient[] = [];
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
    this.listeClient();
  }

  formInit() {
    this.clientForm = this.fbuilder.group({
      id: [''],
      code: ['', [Validators.required, Validators.minLength(4)]],
      lastname: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      compte: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]]
    });
    this.checked = false;
  }

  listeClient() {
    this.chargement = true;
    this.clientService.read().subscribe(
      {
        next: response => {
          this.chargement = false;
          this.clients = response;
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

  enregistrerClient() {
    this.chargement = true;
    const body: IClient = {
      id: this.clientForm.value.id,
      code: this.clientForm.value.code,
      firstname: this.clientForm.value.firtsname,
      lastname: this.clientForm.value.firtsname,
      email: this.clientForm.value.email,
      phone: this.clientForm.value.phone,
      compte: this.clientForm.value.compte,
      interne: this.checked
    }
    if (!body.id) {
      this.clientService.create(body).subscribe(
        {
          next: response => {
            this.chargement = false;
            this.listeClient();
            this.formInit();
            this.Toast.fire({
              icon: "success",
              title: "Client créé avec succès"
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
      this.clientService.update(body, body.id).subscribe(
        {
          next: response => {
            this.chargement = false;
            this.showModalEdit = false;
            this.listeClient();
            this.formInit();
            this.Toast.fire({
              icon: "success",
              title: "Client modifié avec succès"
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

  obtenirDonneesClient(client: IClient) {
    this.clientForm.patchValue({
      id: client.id,
      code: client.code,
      firstname: client.firstname,
      lastname: client.firstname,
      compte: client.compte,
      email: client.email,
      phone: client.phone
    });
    this.checked = client.interne
  }

  supprimerClient(cid: number) {
    this.chargementSuppr = true;
    this.clientService.delete(cid).subscribe(
      {
        next: response => {
          this.chargementSuppr = false;
          this.listeClient();
          this.Toast.fire({
            icon: "success",
            title: "Client supprimé avec succès"
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
