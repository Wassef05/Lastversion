import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
 
@Injectable({
  providedIn: 'root'
})
export class AdminService {
 
private url="http://localhost:3000/api/admin";
  constructor(private http:HttpClient) { }

 

  add(resource:any)   {
    return this.http.post<any>(this.url+'/addAdmin',resource)
    
      //.catch(this.handleError);
  }

  getAll(id:any){
    return this.http.get<any>(this.url+'/getAllByUser/'+id)
  }
  delete(id:any){
    return this.http.delete<any>(this.url+'/delete/'+id)
  }
  signinAdmin(resource:any){
    return this.http.post<any>(this.url+'/signinAdmin',resource)
  }
  
  
}
