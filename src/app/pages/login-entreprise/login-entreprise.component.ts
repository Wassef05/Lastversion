import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login-entreprise',
  templateUrl: './login-entreprise.component.html',
  styleUrls: ['./login-entreprise.component.css']
})
export class LoginEntrepriseComponent implements OnInit {

  error:boolean=false;
  errorMessage:string='';
  type:string='password';
  isText:boolean=false;
  eyeIcon:string="fa-eye-slash";

 
  loginForm!:FormGroup;
   constructor(private toast: HotToastService,private fb:FormBuilder,private authService:AuthService,
    private router:Router) { }

  ngOnInit(): void {
    this.loginForm=this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required]

    })
  }
 

  hideShowPass(){
    this.isText=!this.isText;
    this.isText ? this.eyeIcon="fa-eye":this.eyeIcon="fa-eye-slash"
    this.isText ? this.type="text":this.type="password"
  }
  onSubmit(){
    console.log(this.loginForm.value);
    
 

         this.authService.loginCompany(this.loginForm.value).subscribe((res:any)=>{
          console.log(res);
          
      localStorage.setItem('token',res.token)
      localStorage.setItem('id',res.id)
      localStorage.setItem('role','Employeur')
    //  localStorage.setItem('id',res.username);
    //  localStorage.setItem('role',)
      this.router.navigate(['/mon-espace/mon-profile'])
      this.authService.setIsLogged(true);
      this.authService.setRole('Employeur')
      localStorage.setItem('name',res.name)
        
      },(error:any)=>{
       // console.log(error.error.message);
      //  this.error=true;
      //  this.errorMessage=error.error.message
      
      this.toast.error(error.error.errors);
      })
//send the object to database
     

  }
   

  
}
