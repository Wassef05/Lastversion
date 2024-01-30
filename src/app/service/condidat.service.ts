// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { switchMap } from 'rxjs/operators';
 
 
// @Injectable({
//   providedIn: 'root'
// })
// export class CondidatService {
 
// private url="http://localhost:3000/api/condidat";
//   constructor(private http:HttpClient) { }

 

//   add(resource:any)   {
//     return this.http.post<any>(this.url+'/addCondidat',resource)
    
//       //.catch(this.handleError);
//   }

//   getCondidatByUser(id:any){
//     return this.http.get<any>(this.url+'/getAllByUser/'+id)
//   }
//   getCondidatByCompany(id:any){
//     return this.http.get<any>(this.url+'/getAllByCompany/'+id)
//   }
  
//   updateStatus(id:any,value:any){
//     console.log(value);
//     //console.log(this.http.put<any>(this.url+'/updateStatus/'+id,value));
    
    
//     return this.http.put<any>(this.url+'/updateStatus/'+id,value);
//   }

//   updateStatusP(id:any,date:any){
//     let data={
//       date:date
//     }
//     return this.http.put<any>(this.url+'/updateStatusP/'+id,data);
//   }

//   sendRequest(id:any,date:any){
//     let data={
//       date:date
//     }
//     //return this.http.put<any>(this.url+'/updateStatusP/'+id,data);
//     return this.http.get<any>(this.url+'/sendRequest/'+id);
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
 
 
@Injectable({
  providedIn: 'root'
})
export class CondidatService {
 
  private url="http://localhost:3000/api/condidat";
  constructor(private http:HttpClient) { }

 

  add(resource:any)   {
    return this.http.post<any>(this.url+'/addCondidat',resource)
    
      //.catch(this.handleError);
  }

  getCondidatByUser(id:any){
    return this.http.get<any>(this.url+'/getAllByUser/'+id)
  }
  getCondidatByCompany(id:any){
    return this.http.get<any>(this.url+'/getAllByCompany/'+id)
  }
  
  updateStatus(id:any,value:any,description: string,emailSubject:string){
    console.log("date==> ",value);
    //console.log(this.http.put<any>(this.url+'/updateStatus/'+id,value));
    let data={
      date:value,
      description: description, // Add description to the request
      emailSubject :emailSubject

    }
    
    return this.http.put<any>(this.url+'/updateStatus/'+id,data);
  }
  updateStatusR(id:any,value:any){
    console.log("date==> ",value);
    //console.log(this.http.put<any>(this.url+'/updateStatus/'+id,value));
    let data={
      date:value
    }
    
    return this.http.put<any>(this.url+'/updateStatusR/'+id,data);
  }
  updateStatusP(id:any,date:any){
    let data={
      date:date
    }
    return this.http.put<any>(this.url+'/updateStatusP/'+id,data);
  }

  sendRequest(id:any,date:any){
    let data={
      date:date
    }
    //return this.http.put<any>(this.url+'/updateStatusP/'+id,data);
    return this.http.get<any>(this.url+'/sendRequest/'+id);
  }
}
