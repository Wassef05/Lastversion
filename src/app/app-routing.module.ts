import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/mon-espace/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterEntrepriseComponent } from './pages/register-entreprise/register-entreprise.component';
import { ProfileUserComponent } from './pages/mon-espace/profile-user/profile-user.component';
import { AddOffreComponent } from './pages/mon-espace/add-offre/add-offre.component';
import { ListeEntrepriseComponent } from './pages/mon-espace/liste-entreprise/liste-entreprise.component';
import { ListeUtilisateurComponent } from './pages/mon-espace/liste-utilisateur/liste-utilisateur.component';
import { LoginEntrepriseComponent } from './pages/login-entreprise/login-entreprise.component';
import { OffresComponent } from './pages/offres/offres.component';
import { OffreDetailComponent } from './pages/offre-detail/offre-detail.component';
import { ListeCondidatComponent } from './pages/mon-espace/liste-condidat/liste-condidat.component';
import { ListeOffreComponent } from './pages/mon-espace/liste-offre/liste-offre.component';
import { ActualiteComponent } from './pages/mon-espace/actualite/actualite.component';
import { ActualitesComponent } from './pages/actualites/actualites.component';
import { ArticleComponent } from './pages/mon-espace/article/article.component';
import { TravauxComponent } from './pages/travaux/travaux.component';
import { TravauxDetailsComponent } from './pages/travaux-details/travaux-details.component';

 const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'espcae-entreprise', component: RegisterEntrepriseComponent },
    { path: 'espace-employeur', component: RegisterComponent },
    {path:'login-entreprise',component:LoginEntrepriseComponent},
    {path:'actualites',component:ActualitesComponent},
    {path:'travaux-de-recherche',component:TravauxComponent},
    {path:'travaux-details/:id',component:TravauxDetailsComponent},
    {
        path:'mon-espace',
        component:DashboardComponent,
        
        
        children:[
          {
          path:'mon-profile',
          component:ProfileUserComponent
        },
        {
            path:'ajouter-offre',
            component:AddOffreComponent
          },
          {
            path:'liste-entreprise',
            component:ListeEntrepriseComponent
          },
          {
            path:"liste-utilisateur",
            component:ListeUtilisateurComponent
          },
          {
            path:"liste-offre",
            component:ListeOffreComponent

          },
          {
            path:"liste-condidat",
            component:ListeCondidatComponent

          },
          {
            path:"actualite",
            component:ActualiteComponent

          },
          {
            path:"article",
            component:ArticleComponent
          }
        
      ]
      },
     
          {
        path:"jobs",
        component:OffresComponent
      },
      {
        path:"job/:id",
        component:OffreDetailComponent
      },
      
       
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],


    exports: [RouterModule]
})

export class AppRoutingModule { }