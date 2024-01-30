import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/service/auth.service';
import { CondidatService } from 'src/app/service/condidat.service';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';
// import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-liste-condidat',
  templateUrl: './liste-condidat.component.html',
  styleUrls: ['./liste-condidat.component.css']
})
export class ListeCondidatComponent implements OnInit {


  @ViewChild('content', { static: false }) el!: ElementRef;
 
  @ViewChild('myModal', { static: false }) myModal!: ElementRef ;
role:any;
status:any
elm:any= HTMLElement;
date:any=''
// emailSubject: string = '';
lettremotivation: string = '';
emailSubject: string = '';
customDescription: string = '';
id:any
condidat:any=[]
  idc: any;
  description: any;
  constructor( private condidatService:CondidatService,private authService:AuthService,private toast: HotToastService) {

    this.role=localStorage.getItem('role')
   }

  ngOnInit(): void {
    this.authService.role.subscribe(res=>{
      this.role=res
    })
    
    
    this.getAll()
  }
  getAll(){
    console.log(this.role);
    
        
    if(this.role=='Condidat'){
      console.log("ok");
      
      this.condidatService.getCondidatByUser(localStorage.getItem('id')).subscribe(res=>{
        console.log(res);

        this.condidat=res.data
        console.log("wassef",this.condidat);
        
        
      })
    }else
    if(this.role=='Employeur'){
      console.log("get by company");
      
      this.condidatService.getCondidatByCompany(localStorage.getItem('id')).subscribe(res=>{
        console.log(res);
        this.condidat=res.data
        console.log("wassef",this.condidat);
      })
    }
  }
  onSelected(e:any,id:any){
    console.log(id);
    this.idc=id
    let value={
      value:e.target.value
    }

      this.status=e.target.value
      if(this.status!=="Présélectionne"){

     this.condidatService.updateStatusR(id,value).subscribe(res=>{
       this.toast.success('Modifier avec succès!!');
      this.getAll()
     })
    
  }else{
    this.id=id
    this.open();
  }
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

// send(){
//   if(this.date!=''){
//     console.log("idc",this.idc)
//     console.log("date",this.date)
//   this.condidatService.updateStatus(this.idc,this.date).subscribe(res=>{
//     this.toast.success('Modifier avec succes!!');
//     this.getAll()
//     this.close()
//    this.date=''
//   })
// }else{
//   this.toast.error('Selectionne date d\'entretient!!');
// }
// }

send() {
  if (this.date !== '') {
    console.log("idc", this.idc);
    console.log("description", this.description);
    console.log("date", this.date);
    console.log("emailSubject", this.emailSubject);


    // Utilisez this.customDescription au lieu de this.description
    this.condidatService.updateStatus(this.idc, this.date, this.customDescription,this.emailSubject).subscribe(res => {
      this.toast.success('Modifier avec succès!!');
      this.getAll();
      this.close();
      this.date = '';
      this.emailSubject = '';
      this.customDescription = '';  // Réinitialisez customDescription après l'envoi
    });
  } else {
    this.toast.error("Sélectionnez une date d'entretien!!");
  }
}


// async send() {
//   emailjs.init('ggMxHTccbD41GbUPr')
// // let response =await emailjs.send("service_iu691xn","template_r50a4dp",{
// //   to_name: this.form.value.to_name,
// //   from_email: this.form.value.from_email,
// //   subject: this.form.value.subject,
// //   message: this.form.value.message,
// //   });
// emailjs.send("service_iu691xn","template_06re3k9",{
//   from_name: this.form.value.from_name,
//   to_name: this.form.value.to_name,
//   subject: this.form.value.subject,
//   message: this.form.value.message,
//   from_email: this.form.value.from_email,
//   to_email: this.form.value.to_email,
//   });
//   alert('message envoyer avec succé .');
//   this.form.reset();
// }



// response(id:any){
//   Swal.fire({
//     title: 'Souhaitez-vous confirmer le candidat?',
//     showDenyButton: true,
//     showCancelButton: true,
//     confirmButtonText: 'Confirmer',
//     denyButtonText: `Refuser`,
//   }).then((result) => {
//     /* Read more about isConfirmed, isDenied below */
//     if (result.isConfirmed) {
     
//       this.condidatService.sendRequest(id,this.date).subscribe(res=>{
//       Swal.fire('Accepter!', '', 'success')
//     })
//     } else if (result.isDenied) {
//       Swal.fire('Candidat refuse', '', 'info')
//     }
//   })
  

// }


response(id: any) {
  // Demander le titre et la description du message
  const result = Swal.fire({
    title: 'Souhaitez-vous confirmer le candidat?',
    html:
      '<input id="swal-input-title" class="swal2-input" placeholder="Titre du message">' +
      '<input id="swal-input-description" class="swal2-input" placeholder="Description du message">',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Confirmer',
    denyButtonText: 'Refuser',
    preConfirm: () => {
      // Récupérer les valeurs du titre et de la description
      const title = (<HTMLInputElement>document.getElementById('swal-input-title')).value;
      const description = (<HTMLInputElement>document.getElementById('swal-input-description')).value;
      return { title, description };
    }
  }).then((result: any) => { // Ajouter le type any ici
    if (result.isConfirmed) {
      // Utiliser result.value.title et result.value.description pour accéder aux valeurs
      this.condidatService.sendRequest(id, this.date).subscribe(res => {
        Swal.fire('Accepter!', '', 'success');
      });
    } else if (result.isDenied) {
      Swal.fire('Candidat refusé', '', 'info');
    }
  });
}
}