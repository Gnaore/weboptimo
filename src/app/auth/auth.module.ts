import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ConnexionComponent } from './connexion/connexion.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressBarModule } from 'primeng/progressbar';


@NgModule({
  declarations: [
    ConnexionComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    MessageModule,
    ReactiveFormsModule,
    ProgressBarModule
  ]
})
export class AuthModule { }
