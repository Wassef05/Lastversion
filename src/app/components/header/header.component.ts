import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { SharedService } from 'src/app/service/shared.service'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogged: any;
  showHeader: boolean = true;


  constructor(private authService: AuthService, private sharedService: SharedService) {}

  ngOnInit(): void {
    this.isLogged = this.authService.isLogged();

    
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const scrollY = window.scrollY;
    // Définir votre propre logique en fonction de la position de défilement
    this.showHeader = scrollY < 200; // Afficher le header si la position de défilement est inférieure à 200 pixels
  }

    
  
}
