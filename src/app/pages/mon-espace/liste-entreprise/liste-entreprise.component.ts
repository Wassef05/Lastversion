// import { Component, OnInit } from '@angular/core';
// import { EntrepriseService } from './../../../service/entreprise.service';
// import { HotToastService } from '@ngneat/hot-toast';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-liste-entreprise',
//   templateUrl: './liste-entreprise.component.html',
//   styleUrls: ['./liste-entreprise.component.css']
// })
// export class ListeEntrepriseComponent implements OnInit {

//   constructor(private entrepriseService:EntrepriseService,private toast: HotToastService) { }
// company:any=[]
// value:any
// p: number = 1;
//   ngOnInit(): void {
//     this.getAll()
   
//   }
//   valuechange(e:any){
//     this.entrepriseService.search(this.value).subscribe(res=>{
//       this.company=res.data
//     })
// }


//   getAll(){
//     this.entrepriseService.getAll().subscribe(res=>{
//       this.company=res.data
//     })
//   }

//   delet(id:any){
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         this.entrepriseService.delete(id).subscribe(res=>{
//           this.getAll()
//           this.toast.success('Entreprise suuprimer avec success')
//         })
//       }
//     })
    
//   }
//   update(id:any){
//     this.entrepriseService.update(id).subscribe(res=>{
//       this.toast.success("Entreprise activé")
//       this.getAll()
//     })
//   }
// }


import { Component, OnInit } from '@angular/core';
import { EntrepriseService } from './../../../service/entreprise.service';
import { HotToastService } from '@ngneat/hot-toast';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-entreprise',
  templateUrl: './liste-entreprise.component.html',
  styleUrls: ['./liste-entreprise.component.css']
})
export class ListeEntrepriseComponent implements OnInit {

  constructor(private entrepriseService:EntrepriseService,private toast: HotToastService) { }
  company:any=[]
  value:any
  p: number = 1;

  ngOnInit(): void {
    this.getAll();
  }

  valuechange(e:any){
    this.entrepriseService.search(this.value).subscribe(res=>{
      this.company=res.data;
    });
  }

  getAll(){
    this.entrepriseService.getAll().subscribe(res=>{
      this.company=res.data;
      console.log("data",this.company)
    });
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
        this.entrepriseService.delete(id).subscribe(res=>{
          this.getAll();
          this.toast.success('Entreprise supprimée avec succès');
        });
      }
    });
  }

  update(id:any){
    this.entrepriseService.update(id).subscribe(res=>{
      this.toast.success("Entreprise activée");
      this.getAll();
    });
  }
}
