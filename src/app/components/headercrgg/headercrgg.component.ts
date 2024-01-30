import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-headercrgg',
  templateUrl: './headercrgg.component.html',
  styleUrls: ['./headercrgg.component.css']
})
export class HeadercrggComponent implements OnInit {

  isLogged: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLogged = this.authService.isLogged();
  }

}
