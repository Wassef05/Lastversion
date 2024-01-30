import { Component, OnInit } from '@angular/core';
import { OffreService } from 'src/app/service/offre.service';

@Component({
  selector: 'app-liste-offre',
  templateUrl: './liste-offre.component.html',
  styleUrls: ['./liste-offre.component.css']
})
export class ListeOffreComponent implements OnInit {
  offres:any;
  value:any
  constructor(private offreService:OffreService) { }

  ngOnInit(): void {
    
    
    this.offreService.getOffreByCompany(localStorage.getItem('id')).subscribe(res=>{
      this.offres=res.data
      console.log(this.offres);
      
    })
  }

  valuechange(e:any){
this.offreService.serach(this.value,localStorage.getItem('id')).subscribe(res=>{
  this.offres=res.data
})

  }

}
