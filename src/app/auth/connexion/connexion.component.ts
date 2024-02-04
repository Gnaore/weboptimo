import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {
  fbuilder = inject(FormBuilder);
  authService = inject(AuthService);
  connexionForm!: FormGroup;
  chargement: boolean = false;
  erreurTrouvee: boolean = false;
  message: string = '';

  ngOnInit(): void {
    this.initForm();
    document.getElementById('username')?.focus();
  }

  initForm() {
    this.connexionForm = this.fbuilder.group({
      nomUtilisateur: ['', Validators.required],
      motDePasse: ['root', Validators.required]
    })
  }

  soumettre() {
    const credentials = new FormData();
    credentials.append('username', this.connexionForm.value.nomUtilisateur);
    credentials.append('password', this.connexionForm.value.motDePasse);
    this.authService.loginUser(credentials).subscribe({
      next: (response) => {
        this.chargement = false;
        if (response.state) {
          this.erreurTrouvee = false;
          this.message = response.message;
          location.href = "/admin";
        }
        else {
          this.erreurTrouvee = true;
        }
      },
      error: (err) => {
        this.chargement = false;
        this.erreurTrouvee = true;
        console.log(err);
      }
    })
  }
}
