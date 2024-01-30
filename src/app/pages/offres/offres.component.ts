import { Component, OnInit } from '@angular/core';
import { OffreService } from 'src/app/service/offre.service';

@Component({
  selector: 'app-offres',
  templateUrl: './offres.component.html',
  styleUrls: ['./offres.component.css']
})
export class OffresComponent implements OnInit {
  offres:any=[]
  type:any='';
  key:any='';
  offreLimit: number = 8; 
  offreIncrement: number = 8;   

  constructor(private offreService:OffreService) { }

  ngOnInit(): void {

    this.offreService.getAll().subscribe(res=>{
      this.offres=res.data
      console.log("offer",this.offres)
    })

  }
search(){
 this.offreService.searchOffre(this.key,this.type).subscribe(res=>{
  this.offres=res.data
 })
  
}
showMore() {
  this.offreLimit += this.offreIncrement;
}


}
