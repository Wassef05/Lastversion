import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
 
@Injectable({
  providedIn: 'root'
})
export class UserService {
 
private url="http://localhost:3000/api/user";
  constructor(private http:HttpClient) { }

  delete(id:any){
    return this.http.delete<any>(this.url+'/delete/'+id)
   }

   search(key:any){
    return this.http.get<any>(this.url+'/search/'+key)
   }

  getAll()   {
    return this.http.get<any>(this.url+'/allUser')
    
      //.catch(this.handleError);
  }

  getSingle(id:any)   {
    return this.http.get<any>(this.url+'/getSingle/'+id)
    
      //.catch(this.handleError);
  }
  getSingleentr(id:any)   {
    return this.http.get<any>(this.url+'/getSinglentre/'+id)
    
      //.catch(this.handleError);
  }
  

  update(resource:any,id:any){
    return this.http.put<any>(this.url+'/updateUser/'+id,resource)
  }
  
  
}
