import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { TableauDeBordComponent } from './tableau-de-bord/tableau-de-bord.component';
import { ImportationComponent } from './importation/importation.component';
import { EmplacementComponent } from './emplacement/emplacement.component';
import { RechercheRapideComponent } from './recherche-rapide/recherche-rapide.component';
import { QrLocalisationComponent } from './qr-localisation/qr-localisation.component';
import { RechercheAvanceeComponent } from './recherche-avancee/recherche-avancee.component';
import { QrBordereauComponent } from './qr-bordereau/qr-bordereau.component';
import { DossierImpressionComponent } from './dossier-impression/dossier-impression.component';
import { ListeAcquisitionComponent } from './liste-acquisition/liste-acquisition.component';

const routes: Routes = [
  { 
    path: '', component: AdminMainComponent, children: [
      { path: '', redirectTo: 'emplacements', pathMatch: 'full' } ,
      { path: 'tableau-de-bord', component: TableauDeBordComponent },
      { path: 'importation', component: ImportationComponent },
      { path: 'emplacements', component: EmplacementComponent },
      { path: 'recherche-rapide', component: RechercheRapideComponent },
      { path: 'recherche-avancee', component: RechercheAvanceeComponent },
      { path: 'localisation', component: QrLocalisationComponent },
      { path: 'bordereau', component: QrBordereauComponent },
      { path: 'dossier-impression', component: DossierImpressionComponent },
      { path: 'liste-acquisition', component: ListeAcquisitionComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
