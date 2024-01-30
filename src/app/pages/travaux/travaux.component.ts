import { Component, OnInit } from '@angular/core';
import { ActualiteService } from 'src/app/service/actualite.service';
import { TravauxService } from 'src/app/service/travaux.service';

@Component({
  selector: 'app-travaux',
  templateUrl: './travaux.component.html',
  styleUrls: ['./travaux.component.css']
})
export class TravauxComponent implements OnInit {

  travaux:any
  constructor(private travauxService:TravauxService) { }

  ngOnInit(): void {
    this.travauxService.getAll().subscribe(res=>{
      this.travaux=res.data
    })

  }
get(type:any){
  
}
}
