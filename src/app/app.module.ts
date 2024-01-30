import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
 import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './service/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './pages/mon-espace/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { MatIconModule } from '@angular/material/icon';


 import { HomeComponent } from './pages/home/home.component';
import { RegisterEntrepriseComponent } from './pages/register-entreprise/register-entreprise.component';
 import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileUserComponent } from './pages/mon-espace/profile-user/profile-user.component';
import { AddOffreComponent } from './pages/mon-espace/add-offre/add-offre.component';
import { ListeUtilisateurComponent } from './pages/mon-espace/liste-utilisateur/liste-utilisateur.component';
import { ListeOffreComponent } from './pages/mon-espace/liste-offre/liste-offre.component';
import { OffreDetailsComponent } from './pages/mon-espace/offre-details/offre-details.component';
import { ListeEntrepriseComponent } from './pages/mon-espace/liste-entreprise/liste-entreprise.component';
import { ListeCondidatComponent } from './pages/mon-espace/liste-condidat/liste-condidat.component';
import { UserService } from './service/user.service';
import { EntrepriseService } from './service/entreprise.service';
import { LoginEntrepriseComponent } from './pages/login-entreprise/login-entreprise.component';
import { OffresComponent } from './pages/offres/offres.component';
import { OffreDetailComponent } from './pages/offre-detail/offre-detail.component';
import { CondidatService } from './service/condidat.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { ActualiteComponent } from './pages/mon-espace/actualite/actualite.component';
import { ActualitesComponent } from './pages/actualites/actualites.component';
import { ArticleComponent } from './pages/mon-espace/article/article.component';
import { TravauxComponent } from './pages/travaux/travaux.component';
import { TravauxDetailsComponent } from './pages/travaux-details/travaux-details.component';
import { HeadComponent } from './components/head/head.component';
import { HeadercrggComponent } from './components/headercrgg/headercrgg.component';
import { SharedService } from './service/shared.service';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    RegisterEntrepriseComponent,
    HomeComponent,
 
    SidebarComponent,
    NavbarComponent,
    ProfileUserComponent,
    AddOffreComponent,
    ListeUtilisateurComponent,
    ListeOffreComponent,
    OffreDetailsComponent,
    ListeEntrepriseComponent,
    ListeCondidatComponent,
    LoginEntrepriseComponent,
    OffresComponent,
    OffreDetailComponent,
    LoginAdminComponent,
    ActualiteComponent,
    ActualitesComponent,
    ArticleComponent,
    TravauxComponent,
    TravauxDetailsComponent,
    HeadComponent,
    HeadercrggComponent,
    
   ],
  imports: [

  BrowserModule,
  BrowserAnimationsModule, // required animations module
  FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HotToastModule.forRoot(),
    NgxPaginationModule,
    MatIconModule,

   
    
  ],
  providers: [AuthService,UserService,EntrepriseService,CondidatService,SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
