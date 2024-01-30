import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import jsPDF from 'jspdf';
import { AuthService } from 'src/app/service/auth.service';
import { LoginRequest } from '../../models/LoginRequest';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error:boolean=false;
  errorMessage:string='';
  type:string='password';
  isText:boolean=false;
  eyeIcon:string="fa-eye-slash";
  loginForm!:FormGroup;
  @ViewChild('content', { static: false }) el!: ElementRef;
  constructor(private toast: HotToastService,private fb:FormBuilder,private authService:AuthService,
    private router:Router) { }

  ngOnInit(): void {
    this.loginForm=this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]

    })
    this.startSlideshow();

  }
  startSlideshow() {
    throw new Error('Method not implemented.');
  }
  hideShowPass(){
    this.isText=!this.isText;
    this.isText ? this.eyeIcon="fa-eye":this.eyeIcon="fa-eye-slash"
    this.isText ? this.type="text":this.type="password"
  }
  onSubmit(){

    if(this.loginForm.valid){

     const loginRequest:LoginRequest={email:this.loginForm.value.username,password:this.loginForm.value.password}
      this.authService.login(loginRequest).subscribe((res:any)=>{
      localStorage.setItem('token',res.token)
       localStorage.setItem('id',res.id)
       localStorage.setItem('role','Condidat')
       localStorage.setItem('name',res.name)
       this.router.navigate(['/dashboard'])
      this.authService.setIsLogged(true);
      this.authService.setRole('Condidat');
      this.authService.setName(res.name);
  
        
      },(error:any)=>{
        console.log(error.error.errors);
        this.error=true;
        this.errorMessage=error
        this.toast.error(error.error.errors);
        
      })
//send the object to database
    }else{
      console.log("form is not valid");
      this.validateAllformFields(this.loginForm)
       
      //throw the error using toaster and with required fields
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

  
}
