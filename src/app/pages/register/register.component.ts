import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { HotToastService } from '@ngneat/hot-toast';
import { CondidatService } from 'src/app/service/condidat.service';
 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  type:string='password';
  isText:boolean=false;
  eyeIcon:string="fa-eye-slash";
  cv!:File;
  lettremotivation!:File;

  
  registerForm!:FormGroup
  constructor(private fb:FormBuilder,private authService:AuthService,private toast: HotToastService) { }

  ngOnInit(): void {
    this.registerForm=this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
      adresse:['',Validators.required],
      date:['',Validators.required],
      cv:['',Validators.required],
      lettremotivation:['',Validators.required],


    })
  }

 
  hideShowPass(){
    this.isText=!this.isText;
    this.isText ? this.eyeIcon="fa-eye":this.eyeIcon="fa-eye-slash"
    this.isText ? this.type="text":this.type="password"
  }
  onSubmit(){
    console.log(this.registerForm.value);


    if(this.registerForm.valid){
      let data = new FormData();
      if (this.cv) {
        //data.append("logo", this.logo);
        data.append("cv", this.cv); // Ajoute le nom du fichier séparément
      }
      
      if (this.lettremotivation) {
       // data.append("rne", this.rne);
        data.append("lettremotivation", this.lettremotivation); // Ajoute le nom du fichier séparément
      }

      // data.append("cv", this.cv);
      // data.append("lettremotivation", this.lettremotivation);


      data.append("firstName", this.registerForm.value.firstName);
      data.append("lastName",  this.registerForm.value.lastName);
      data.append("email",  this.registerForm.value.email);
      data.append("password",  this.registerForm.value.password);
      data.append("adresse",  this.registerForm.value.adresse);
      data.append("date",  this.registerForm.value.date);
      
      console.log("data",data);

      this.authService.rgisterUser(data).subscribe(res=>{
        this.toast.success('Registred with succes!!');
    this.registerForm.reset();
    
        
       },(err=>{
        console.log(err);
        
        this.toast.error(err.error.message)
       }))
//send the object to database
    } 

  }
  private validateAllformFields(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field=>{
      const control =formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true});
      }else if(control instanceof FormGroup){
        this.validateAllformFields(control)
      }
    })
  }
  onChange(event:any) {
    this.cv = event.target.files[0];
    console.log("cv",this.cv)

  }

  onlmChange(event:any){
    this.lettremotivation = event.target.files[0];
    console.log("lettremotivation",this.lettremotivation)

  }
}
