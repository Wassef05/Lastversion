import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
 
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register-entreprise',
  templateUrl: './register-entreprise.component.html',
  styleUrls: ['./register-entreprise.component.css']
})
export class RegisterEntrepriseComponent implements OnInit {

  entrepriseForm!:FormGroup;
  type:string='password';
  isText:boolean=false;
  eyeIcon:string="fa-eye-slash"
  isSubmitted:boolean=false;
  logo: File | undefined;
  rne: File | undefined;
 
  

  
  constructor(private fb:FormBuilder,private authService:AuthService,private toast: HotToastService) { }

  ngOnInit(): void {
    this.entrepriseForm=this.fb.group({
      email:['',Validators.required],
      responsable:['',Validators.required],
      nom:['',Validators.required],
      telephone:['',Validators.required],
      adresse:['',Validators.required],
      password:['',Validators.required],
      gouvernorat:['',Validators.required],
       secteur:['',Validators.required], 
      identifiant:['',Validators.required], 

      
    })
  }
  hideShowPass(){
    this.isText=!this.isText;
    this.isText ? this.eyeIcon="fa-eye":this.eyeIcon="fa-eye-slash"
    this.isText ? this.type="text":this.type="password"
  }
  onSubmit(){
    this.isSubmitted=true
    console.log(this.entrepriseForm.value);
    

    if(this.entrepriseForm.valid){

       
      
      let data = new FormData();
      if (this.logo) {
        data.append("logo", this.logo);
        console.log("wassef" , this) // Ajoute le nom du fichier séparément
      }
      
      if (this.rne) {
        data.append("rne", this.rne); 
      }

      

      data.append("email", this.entrepriseForm.value.email);
      data.append("responsable", this.entrepriseForm.value.responsable);
      data.append("nom", this.entrepriseForm.value.nom);
      data.append("telephone", this.entrepriseForm.value.telephone);
      data.append("password", this.entrepriseForm.value.password);
      data.append("gouvernorat", this.entrepriseForm.value.gouvernorat);
      data.append("secteur", this.entrepriseForm.value.secteur);
      data.append("identifiant", this.entrepriseForm.value.identifiant);
      data.append("adresse", this.entrepriseForm.value.adresse);
     // data.append("logo", this.entrepriseForm.value.logo);
     console.log("data",data);
       this.authService.rgisterCompany(data).subscribe(res=>{
        this.toast.success('Registred with succes!!');
        this.entrepriseForm.reset();
        this.isSubmitted=false
        
       },
       (error) => {
        console.log(error);
        this.toast.error(error.error.message);
      }
      );
    } else {
      console.error('Logo or RNE file is missing.');
    }
  }
 
  changeGov(e: any) {
    this.gouvernoratName?.setValue(e.target.value, {
      onlySelf: true,
    });
}
 // Access formcontrols getter changeSecteur
 get gouvernoratName() {
  return this.entrepriseForm.get('gouvernorat');
}
changeSecteur(e: any) {
  this.secteurName?.setValue(e.target.value, {
    onlySelf: true,
  });
}
// Access formcontrols getter changeSecteur
get secteurName() {
return this.entrepriseForm.get('secteur');
}
onChange(event:any) {
  this.logo = event.target.files?.[0]; 
  console.log("logo",this.logo)
   
}
onRneChange(event: any) {
  this.rne = event.target.files?.[0];
  console.log("rne",this.rne)
}
}
