import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
 
@Injectable({
  providedIn: 'root'
})
export class OffreService {
 
private url="http://localhost:3000/api/offre";
  constructor(private http:HttpClient) { }
  getOffreByCompany(id:any){
    return this.http.get<any>(this.url+'/getOffreByCompany/'+id)
  }
  getOffreByUser(id:any){
    return this.http.get<any>(this.url+'/getOffreByUser/'+id)
  }
 
getSingle(id:any){
  return this.http.get<any>(this.url+'/getSingle/'+id)
}
  getAll()   {
    return this.http.get<any>(this.url+'/getAll')
    
      //.catch(this.handleError);
  }
  addOffre(resource:any)   {
    return this.http.post<any>(this.url+'/addOffre',resource)
    
      //.catch(this.handleError);
  }
  searchOffre(key:String,type:String){
    console.log(key,type);
    
    return this.http.get<any>(this.url+'/searchOffre/'+key+'/'+type)
  } 
  serach(key:any,id:any){
    return this.http.get<any>(this.url+'/search/'+key+'/'+id)
  }
}
