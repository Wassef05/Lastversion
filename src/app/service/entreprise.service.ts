import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
 
@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {
 
private url="http://localhost:3000/api/entreprise";
  constructor(private http:HttpClient) { }

  delete(id:any){
   return this.http.delete<any>(this.url+'/delete/'+id)
  }
  search(key:any){
    return this.http.get<any>(this.url+'/search/'+key)
  }
  getAll()   {
    return this.http.get<any>(this.url+'/allEntreprise')
    
      //.catch(this.handleError);
  }
  update(id:any){
    //alert(id);
    return this.http.put<any>(this.url+'/update/'+id,{})
  }
  
}
