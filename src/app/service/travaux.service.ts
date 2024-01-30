import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
 
@Injectable({
  providedIn: 'root'
})
export class TravauxService {
 
private url="http://localhost:3000/api/travaux";
  constructor(private http:HttpClient) { }

 

  add(resource:any)   {
    return this.http.post<any>(this.url+'/addTravaux',resource)
    
      //.catch(this.handleError);
  }
  updateImage(id:any,resource:any){
    return this.http.put<any>(this.url+"/updateImage/"+id,resource)
  }
  getAll(){
    return this.http.get<any>(this.url+'/getAllTraveaux')
  }
  delete(id:any){
    return this.http.delete<any>(this.url+'/deleteTravaux/'+id)
  } 
  search(key:any){
    return this.http.get<any>(this.url+'/search/'+key)
  }

   
  getAllByCreateur(){
    let id =localStorage.getItem('id')
    return this.http.get<any>(this.url+'/getAllTraveauxByCreateur/'+id)
  }
  getSingle(id:any){
    return this.http.get<any>(this.url+'/getSingle/'+id)
  }
}
