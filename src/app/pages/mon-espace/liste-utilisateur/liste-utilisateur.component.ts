import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-liste-utilisateur',
  templateUrl: './liste-utilisateur.component.html',
  styleUrls: ['./liste-utilisateur.component.css']
})
export class ListeUtilisateurComponent implements OnInit {
  value:any;
  p: number = 1;
users:any=[]
  constructor(private toast: HotToastService,private userService:UserService) { }

  ngOnInit(): void {
   this.getAll()
  }

  getAll(){
    this.userService.getAll().subscribe(res=>{
      this.users=res.data
    })
  }
  delet(id:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.delete(id).subscribe(res=>{
          this.getAll()
          this.toast.success('Utilisateur suuprimer avec success')
        })
      }
    })
    
  }
  
  valuechange(e:any){
    this.userService.search(this.value).subscribe(res=>{
      this.users=res.data
    })
}

}