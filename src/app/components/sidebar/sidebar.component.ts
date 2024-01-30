import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
role:any;
name:any;
  id: any ;
  entreprise: any;
  constructor(private router:Router,private authService:AuthService,private userService:UserService) {


    
   }

  ngOnInit(): void {
 this.authService.role.subscribe(res=>{
  console.log("rol",res);
  
  this.role=res
 })
 this.authService.name.subscribe(res=>{
  this.name=res
 })
 this.id=localStorage.getItem('id')
if(this.role=="Employeur"){
 this.userService.getSingleentr(this.id).subscribe(res=>{
   
    this.entreprise=res;
    console.log("entreprise",this.entreprise)
 })
}}

  logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('name')
    localStorage.removeItem('id')
    this.router.navigate(['/']);
    this.authService.setIsLogged(false);
    this.authService.setRole('')
    this.authService.setName('')

  }

}
