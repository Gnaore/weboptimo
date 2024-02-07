import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { AppTopbarComponent } from './composants/app.topbar.component';
import { AppConfigComponent } from './composants/app.config.component';
import { AppFooterComponent } from './composants/app.footer.component';
import { TableauDeBordComponent } from './tableau-de-bord/tableau-de-bord.component';
import { AppSidebartabcontentComponent } from './composants/app.sidebartabcontent.component';
import { AppMenuComponent } from './composants/app.menu.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppSideBarComponent } from './composants/app.sidebar.component';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { ImportationComponent } from './importation/importation.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { EmplacementComponent } from './emplacement/emplacement.component';
import { TreeModule } from 'primeng/tree';
import { MessageModule } from 'primeng/message';
import { DialogModule } from 'primeng/dialog';
import { ClientComponent } from './client/client.component';
import { CheckboxModule } from 'primeng/checkbox';
import { ParametresComponent } from './parametres/parametres.component';
import { PasswordModule } from 'primeng/password';
import { BienOrphelinComponent } from './bien-orphelin/bien-orphelin.component';
import { ZoneComponent } from './zone/zone.component';
import { BienComponent } from './bien/bien.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SiteComponent } from './site/site.component';
import { LocalisationComponent } from './localisation/localisation.component';
import { BordereauComponent } from './bordereau/bordereau.component';
import { RechercheRapideComponent } from './recherche-rapide/recherche-rapide.component';
import { QrLocalisationComponent } from './qr-localisation/qr-localisation.component';
import { RechercheAvanceeComponent } from './recherche-avancee/recherche-avancee.component';
import { QrBordereauComponent } from './qr-bordereau/qr-bordereau.component';
import { DossierImpressionComponent } from './dossier-impression/dossier-impression.component';
import { GroupeComponent } from './groupe/groupe.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { BonCommandeComponent } from './bon-commande/bon-commande.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { FamilleComponent } from './famille/famille.component';
import { NatureBienComponent } from './nature-bien/nature-bien.component';
import { ListeAcquisitionComponent } from './liste-acquisition/liste-acquisition.component';

@NgModule({
  declarations: [
    AdminMainComponent,
    AppTopbarComponent,
    AppSideBarComponent,
    AppSidebartabcontentComponent,
    AppConfigComponent,
    AppFooterComponent,
    TableauDeBordComponent,
    AppMenuComponent,
    ImportationComponent,
    EmplacementComponent,
    ClientComponent,
    ParametresComponent,
    BienOrphelinComponent,
    ZoneComponent,
    BienComponent,
    SiteComponent,
    LocalisationComponent,
    BordereauComponent,
    RechercheRapideComponent,
    QrLocalisationComponent,
    RechercheAvanceeComponent,
    QrBordereauComponent,
    DossierImpressionComponent,
    GroupeComponent,
    UtilisateurComponent,
    FournisseurComponent,
    BonCommandeComponent,
    FamilleComponent,
    NatureBienComponent,
    ListeAcquisitionComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RadioButtonModule,
    FormsModule,
    InputTextModule,
    MenubarModule,
    BreadcrumbModule,
    DropdownModule,
    FileUploadModule,
    CheckboxModule,
    TableModule,
    TreeModule,
    MessageModule,
    PasswordModule,
    DialogModule,
    InputNumberModule,
    ReactiveFormsModule,
    InputTextareaModule
  ]
})
export class AdminModule { }
