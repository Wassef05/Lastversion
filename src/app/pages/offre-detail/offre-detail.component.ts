import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { LoginRequest } from 'src/app/models/LoginRequest';
import { AuthService } from 'src/app/service/auth.service';
import { CondidatService } from 'src/app/service/condidat.service';
import { OffreService } from 'src/app/service/offre.service';

@Component({
  selector: 'app-offre-detail',
  templateUrl: './offre-detail.component.html',
  styleUrls: ['./offre-detail.component.css']
})
export class OffreDetailComponent implements OnInit {
  error: boolean = false;
  errorMessage: string = '';
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;
  @ViewChild('content', { static: false }) el!: ElementRef;
  id: any
  offre: any
  offres: any = []
  @ViewChild('myModal', { static: false }) myModal: any = ElementRef;
  elm: any = HTMLElement;
  isLoged: any;
  user: any;
  offreId: any
  entreprise: any
  constructor(
    private condidatService: CondidatService, private toast: HotToastService,
    private fb: FormBuilder, private authService: AuthService,
    private router: Router, private route: ActivatedRoute, private offreService: OffreService, private authservice: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]

    })

    if (localStorage.getItem('id')) {
      this.user = localStorage.getItem('id');
    }
    this.isLoged = this.authservice.isLoggedIn()
    this.id = this.route.snapshot.paramMap.get('id');

    this.offreService.getSingle(this.id).subscribe(res => {
      this.offre = res.data
    })

    this.offreService.getAll().subscribe(res => {
      this.offres = res.data
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
  open(offreId: any, entreprise: any): void {

    //test de signe in
    this.offreId = offreId;
    this.entreprise = entreprise
    this.elm.classList.add('show');
    this.elm.style.width = '100vw';
    if (this.isLoged) {
      let data = {
        offre: this.offreId,
        entreprise: this.entreprise,
        user: localStorage.getItem('id')
      }
      this.condidatService.add(data).subscribe(res => {

      })
    }
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash"
    this.isText ? this.type = "text" : this.type = "password"

  }
  onSubmit() {

    if (this.loginForm.valid) {

      const loginRequest: LoginRequest = { email: this.loginForm.value.username, password: this.loginForm.value.password }
      this.authService.login(loginRequest).subscribe((res: any) => {
        localStorage.setItem('token', res.token)
        localStorage.setItem('id', res.id)
        localStorage.setItem('role', 'Condidat')
        localStorage.setItem('name', res.name)
        this.router.navigate(['/mon-espace/mon-profil'])
        this.authService.setIsLogged(true);
        this.authService.setRole('Condidat');
        this.authService.setName(res.name);
        this.close()
        let data = {
          offre: this.offreId,
          entreprise: this.entreprise,
          user: localStorage.getItem('id')
       
        }

        this.condidatService.add(data).subscribe(res => {
          this.toast.success("Condidat ajouté avec success");
        })

        this.authService.setIsLogged(true);

      }, (error: any) => {
        console.log(error.error.errors);
        this.error = true;
        this.errorMessage = error
        this.toast.error(error.error.errors);

      })
      //send the object to database
    } else {
      console.log("form is not valid");
      this.validateAllformFields(this.loginForm)

      //throw the error using toaster and with required fields
    }

  }
  private validateAllformFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllformFields(control)
      }
    })
  }


}

