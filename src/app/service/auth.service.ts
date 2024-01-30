import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginRequest } from '../models/LoginRequest';
import { catchError, map } from 'rxjs/operators';
import { LoginResponse } from '../models/LoginResponse';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
private url="http://localhost:3000/api/auth";
isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());
  nameSubject = new BehaviorSubject<any>('');
  roleSubject= new BehaviorSubject<any>('');
  name = this.nameSubject.asObservable();
  role = this.roleSubject.asObservable();
  constructor(private http:HttpClient) {
this.setName(localStorage.getItem('name'))
this.setRole(localStorage.getItem('role'))
   }
  



  
  private hasToken() : boolean {
    console.log(!!localStorage.getItem('token'));
    
    return !!localStorage.getItem('token');
  }
  isLoggedIn()  {
     
    return !!localStorage.getItem('token');
   }
  login(resource:any) :Observable<any> {
    return this.http.post<any>(this.url+'/login',resource)
    
      //.catch(this.handleError);
  }
  setIsLogged(value:boolean){
    this.isLoginSubject.next(value);

  }
  setName(value:any){
    this.nameSubject.next(value);

  }
  setRole(value:any){
    this.roleSubject.next(value);

  }

  getName() : Observable<any> {
    return this.nameSubject.asObservable();
   }
   getRole() : Observable<any> {
    return this.roleSubject.asObservable();
   }
  rgisterUser(resource:any){
    return this.http.post<any>(this.url+'/registeruser',resource);
    
      //.catch(this.handleError);
  }
  rgisterCompany(resource:any)   {
    return this.http.post<any>(this.url+'/rgister-entreprise',resource)
    
      //.catch(this.handleError);
  }

  //check if user is loged
  public isLogged(){
    let token=localStorage.getItem('token')
    if(token==undefined || token==''|| token==null){
      return false;
    }
    return true

  }
  public logout(){
    localStorage.removeItem('token') 
  }

 public loginCompany(resource:any){
  console.log(resource);
  
   return this.http.post<any>(this.url+'/signinCompany',resource)
  }
}
