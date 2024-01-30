import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  role:any;
  name:any;
  profileImageSrc: any;
  constructor(private authService:AuthService) {
  
  
      
     }
     
  
    ngOnInit(): void {
      this.getStoredProfileImage();
         this.authService.role.subscribe(res=>{
    console.log(res);
    
    this.role=res
   })
   this.authService.name.subscribe(res=>{
    this.name=res
   })
      
    }
    uploadProfileImage(event: any): void {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          if (e.target && e.target.result) {
            this.profileImageSrc = e.target.result;
            localStorage.setItem('profileImageSrc', this.profileImageSrc);
          }
        };
        reader.readAsDataURL(file);
      }
    }

    getStoredProfileImage(): void {
      const storedImage = localStorage.getItem('profileImageSrc');
      if (storedImage) {
        this.profileImageSrc = storedImage;
      }
    }
    
  
    
}
