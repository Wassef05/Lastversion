import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
 
@Injectable({
  providedIn: 'root'
})
export class EmployeService {
 
private url="http://localhost:3000/api/employe";
  constructor(private http:HttpClient) { }

 

  
  
}
