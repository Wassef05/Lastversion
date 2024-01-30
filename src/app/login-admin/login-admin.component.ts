import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../service/auth.service';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {
  loginForm!:FormGroup;
  constructor(private toast: HotToastService,private fb:FormBuilder,private authService:AuthService,
    private adminService:AdminService,
    private router:Router) { }

  ngOnInit(): void {
    this.loginForm=this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required]

    })

  }

  onSubmit(){

    if(this.loginForm.valid){
       this.adminService.signinAdmin(this.loginForm.value).subscribe((res:any)=>{
      localStorage.setItem('token',res.token)
       localStorage.setItem('id',res.id)
       localStorage.setItem('role','Admin')
       localStorage.setItem('name',res.name)
       this.router.navigate(['/dashboard'])
      this.authService.setIsLogged(true);
      this.authService.setRole('Admin');
      this.authService.setName(res.name);
  
        
      },(error:any)=>{
        console.log(error.error.errors);
        
        this.toast.error(error.error.errors);
        
      })
//send the object to database
    } 

  }

}
