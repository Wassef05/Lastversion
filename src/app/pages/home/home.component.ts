// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { OffreService } from 'src/app/service/offre.service';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent implements OnInit {
//   offres: any[] = [];
//   displayedOffersLimit = 5;

//   constructor(private offreService: OffreService ,  private router: Router) {}

//   ngOnInit(): void {
//     this.loadOffers();
//   }

//   loadOffers(): void {
//     this.offreService.getAll().subscribe(res => {
//       this.offres = res.data;
//     });
//   }

//   loadMoreOffers(): void {
//     this.displayedOffersLimit += 5;
//     this.router.navigate(['/jobs']);
//   }
// }
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OffreService } from 'src/app/service/offre.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  offres: any[] = [];
  displayedOffersLimit = 5;
  currentImageIndex = 0;
  images: string[] = [
    // '../../../assets/images/55.jpg',
    '../../../assets/images/jobs.jpg'
  ];

  constructor(private offreService: OffreService, private router: Router) {}

  ngOnInit(): void {
    this.loadOffers();
    this.startSlideshow();
  }

  loadOffers(): void {
    this.offreService.getAll().subscribe((res) => {
      this.offres = res.data;
    });
  }

  loadMoreOffers(): void {
    this.displayedOffersLimit += 5;
    this.router.navigate(['/jobs']);
  }

  startSlideshow(): void {
    setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    }, 5000); // Change image every 5 seconds
  }


  showIcons(): void {
    // Code à exécuter lorsque la souris entre
  }

  hideIcons(): void {
    // Code à exécuter lorsque la souris quitte
  }
}
