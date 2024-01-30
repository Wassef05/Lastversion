import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { ActualiteService } from 'src/app/service/actualite.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualite',
  templateUrl: './actualite.component.html',
  styleUrls: ['./actualite.component.css']
})
export class ActualiteComponent implements OnInit {
  @ViewChild('content', { static: false }) el!: ElementRef;
 
@ViewChild('myModal', { static: false }) myModal!: ElementRef ;
elm:any= HTMLElement;
actualiteForm!:FormGroup;
image!:File;
actualites:any=[]
value:any
p: number = 1;
constructor(private fb:FormBuilder,private actualiteService:ActualiteService,
   private toast: HotToastService) { }

  ngOnInit(): void {
    this.actualiteForm=this.fb.group({
      titre:['',Validators.required],
      description:['',Validators.required],
      type:['',Validators.required],
    })
    this.getAll()
  }


  getAll(){

    this.actualiteService.getAll().subscribe(res=>{
this.actualites=res.data
      
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
  this.image = event.target.files[0];
   
}

 onSubmit(){

  if(this.actualiteForm.valid){
  let data = new FormData();
      data.append("image", this.image);
      data.append("titre", this.actualiteForm.value.titre);
      data.append("description",  this.actualiteForm.value.description);
      data.append("type",  this.actualiteForm.value.type);
   
  this.actualiteService.add(data).subscribe(res=>{
    this.close()
    this.actualiteForm.reset()
    this.toast.success("Added with succes")
    this.getAll()
  })
}else{
  this.toast.error("All fields require")
}
 }
 
 valuechange(e:any){
  this.actualiteService.search(this.value).subscribe(res=>{
    this.actualites=res.data
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
      this.actualiteService.delete(id).subscribe(res=>{
        this.getAll()
        this.toast.success('Actualite suuprimer avec success')
      })
    }
  })
  
}
}
