import { Component, OnInit } from '@angular/core';
import { ActualiteService } from 'src/app/service/actualite.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-actualites',
  templateUrl: './actualites.component.html',
  styleUrls: ['./actualites.component.css']
})
export class ActualitesComponent implements OnInit {
actualites:any
  
  constructor(private actualiteService:ActualiteService , private sharedService: SharedService) { }

  ngOnInit(): void {
    this.actualiteService.getAll().subscribe(res=>{
      this.actualites=res.data
    })
    this.sharedService.setHeaderPosition('top');
  }
get(type:any){
  this.actualiteService.getByType(type).subscribe(res=>{
    this.actualites=res.data
  })
}
}
