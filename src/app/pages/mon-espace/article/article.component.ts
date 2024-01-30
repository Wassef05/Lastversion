import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { ActualiteService } from 'src/app/service/actualite.service';
import { TravauxService } from 'src/app/service/travaux.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  @ViewChild('content', { static: false }) el!: ElementRef;
 
@ViewChild('myModal', { static: false }) myModal!: ElementRef ;
elm:any= HTMLElement;
travauxForm!:FormGroup;
fichier!:File;
image!:File;
travaux:any=[]
value:any
p: number = 1;
constructor(private fb:FormBuilder,private travauxService:TravauxService,
   private toast: HotToastService) { }

  ngOnInit(): void {
    this.travauxForm=this.fb.group({
      titre:['',Validators.required],
      description:['',Validators.required],
      labo:['',Validators.required],
      specialite:['',Validators.required],
    })
    this.getAll()
  }


  getAll(){

    this.travauxService.getAllByCreateur().subscribe(res=>{
this.travaux=res.data
      
    })
  }


  ngAfterViewInit(): void {
    this.elm = this.myModal.nativeElement as HTMLElement;
 }
 close(): void {
     this.elm.classList.remove('show');
     setTimeout(() => {
       this.elm.style.width = '0';
     }, 75);
 }
 open(): void {
     this.elm.classList?.add('show');
     this.elm.style.width = '100vw';
 }
 
 onChange(event:any) {
  this.fichier = event.target.files[0];
   
}

onChangeI(event:any) {
  this.image = event.target.files[0];
   
}

 onSubmit(){

  if(this.travauxForm.valid){
     
      let id=""+localStorage.getItem('id')
     
  let data = new FormData();
      data.append("file", this.fichier);
      data.append("titre", this.travauxForm.value.titre);
      data.append("description",  this.travauxForm.value.description);
      data.append("labo",  this.travauxForm.value.labo);
      data.append("specialite",  this.travauxForm.value.specialite);
      data.append("createur",id)
      
    
  this.travauxService.add(data).subscribe(res=>{
    let data = new FormData();
    data.append("file", this.image);
    this.travauxService.updateImage(res.data._id,data).subscribe(res=>{
      this.close()
      this.travauxForm.reset()
      
      this.toast.success("Added with succes")
      this.getAll()
    })
   
  })
}else{
  this.toast.error("All fields require")
}
 }
 
 valuechange(e:any){
  this.travauxService.search(this.value).subscribe(res=>{
    this.travaux=res.data
  })
}
 delete(id:any){
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
      this.travauxService.delete(id).subscribe(res=>{
        this.getAll()
        this.toast.success('Trvaux suuprimer avec success')
      })
    }
  })
  
}
}
