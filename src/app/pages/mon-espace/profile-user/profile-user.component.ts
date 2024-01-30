import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {
id:any
userForm!:FormGroup;
  role: string | undefined;

constructor(private fb:FormBuilder,private authService:AuthService,private userService:UserService,private toast: HotToastService) { }

  ngOnInit(): void {

    this.authService.role.subscribe(res=>{
      console.log("rol",res);
      
      this.role=res
     })
     this.id=localStorage.getItem('id')

    this.userForm=this.fb.group({
      email:['',Validators.required],
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      adresse:['',Validators.required],
      responsable:['',Validators.required],
      telephone:['',Validators.required]

    })
    

    if(this.role=="Employeur"){
      this.userService.getSingleentr(this.id).subscribe(res=>{
        console.log("ent",res)
        this.userForm.patchValue({
          email:res.data.email,
          firstName:res.data.nom,
          responsable:res.data.responsable,
          telephone:res.data.telephone,
          adresse:res.data.adresse})
              
            })
     }else{

    this.userService.getSingle(this.id).subscribe(res=>{
this.userForm.patchValue({
  email:res.data.email,
  firstName:res.data.firstName,
  lastName:res.data.lastName,
  adresse:res.data.adresse})
      
    })
  }}
  onSubmit(){
    console.log(this.userForm.value);

    this.userService.update(this.userForm.value,this.id).subscribe(res=>{
      this.toast.success('Updated with succes!!');
    })
    
  }

}
