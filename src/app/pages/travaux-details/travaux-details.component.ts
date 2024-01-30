import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TravauxService } from 'src/app/service/travaux.service';

@Component({
  selector: 'app-travaux-details',
  templateUrl: './travaux-details.component.html',
  styleUrls: ['./travaux-details.component.css']
})
export class TravauxDetailsComponent implements OnInit {
id:any;
travaux:any
  constructor(private route: ActivatedRoute,private travauxService:TravauxService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.travauxService.getSingle(this.id).subscribe(res=>{
      this.travaux=res.data
    })

  }

}
