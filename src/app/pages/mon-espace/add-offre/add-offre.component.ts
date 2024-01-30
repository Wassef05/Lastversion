import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { OffreService } from 'src/app/service/offre.service';

@Component({
  selector: 'app-add-offre',
  templateUrl: './add-offre.component.html',
  styleUrls: ['./add-offre.component.css']
})
export class AddOffreComponent implements OnInit {
  offreForm!:FormGroup;
 
  constructor(private fb:FormBuilder,private offreService:OffreService,
    private router:Router,private toast: HotToastService) { }

  ngOnInit(): void {
    this.offreForm=this.fb.group({
      titre:['',Validators.required],
      posteOuvert:['',Validators.required],
      dataExpiration:['',Validators.required],
      experience:['',Validators.required],
      typeEmploi:['',Validators.required],
      niveauEtude:['',Validators.required],
      description:['',Validators.required],
      

    })
  }
  changeOffre(e: any) {
    this.offreName?.setValue(e.target.value, {
      onlySelf: true,
    });
}
get offreName() {
  return this.offreForm.get('typeEmploi');
}

onSubmit(){

  if(this.offreForm.valid){
  let data=({
    titre:this.offreForm.value.titre,
    posteOuvert:this.offreForm.value.posteOuvert,
    dataExpiration:this.offreForm.value.dataExpiration,
    experience:this.offreForm.value.experience,
    typeEmploi:this.offreForm.value.typeEmploi,
    niveauEtude:this.offreForm.value.niveauEtude,
    description:this.offreForm.value.description,
    entreprise:localStorage.getItem('id')
  })
  this.offreService.addOffre(data).subscribe(res=>{
    this.offreForm.reset()
    this.toast.success('Added with succes!!');

  })
  
}else{
  this.toast.error('All fields require!!');
}
}
}
