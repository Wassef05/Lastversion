import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
 
@Injectable({
  providedIn: 'root'
})
export class ActualiteService {
 
private url="http://localhost:3000/api/actualite";
  constructor(private http:HttpClient) { }

 

  add(resource:any)   {
    return this.http.post<any>(this.url+'/addActualite',resource)
    
      //.catch(this.handleError);
  }

  getAll(){
    return this.http.get<any>(this.url+'/getAllActualite')
  }
  delete(id:any){
    return this.http.delete<any>(this.url+'/deleteActualite/'+id)
  } 
  search(key:any){
    return this.http.get<any>(this.url+'/search/'+key)
  }

  getByType(type:any){
    return this.http.get<any>(this.url+'/getByType/'+type)
  }
}
