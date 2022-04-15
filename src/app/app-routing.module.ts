import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { ListeComponent } from './liste/liste.component';
import { Page404Component } from './page404/page404.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { AjouterComponent } from './ajouter/ajouter.component';
import { DeconnexionComponent } from './deconnexion/deconnexion.component';
import { ReussiComponent } from './reussi/reussi.component';
import { PagePersoComponent } from './page-perso/page-perso.component';

const routes: Routes = [
  {path:'',component: AccueilComponent},
  {path:'liste',component: ListeComponent},
  {path:'connexion',component: ConnexionComponent},
  {path:'inscription',component: InscriptionComponent},
  {path:'ajouter',component: AjouterComponent},
  {path:'deconnexion',component: DeconnexionComponent},
  {path:'reussi',component: ReussiComponent},
  {path:'page-perso',component: PagePersoComponent},
  {path:'**',component: Page404Component}
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
