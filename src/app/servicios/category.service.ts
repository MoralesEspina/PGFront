import { Category } from '../modelos/category.interface';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  constructor(private http:HttpClient) {
  }

  createCategory(form:Category){
    let direccion = environment.URL + "category/";
    return this.http.post(direccion,form,{
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'x-access-token': '' + localStorage.getItem("Token")
      })
    });
  }


  getAllCategories():Observable<Category[]>{
    let direccion = environment.URL + "category";
    return this.http.get<Category[]>(direccion,{
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'x-access-token': '' + localStorage.getItem("Token")
      })
    });
  }

  getCategoryCollection() {
    let direccion = environment.URL + "category";
    return(this.http
      .get<any>(direccion,{
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          'x-access-token': '' + localStorage.getItem("Token")
        })
      }))
  }

/*
  getClientById(_id: any):Observable<ClientI>{
    let direccion = environment.URL + "clients/" +_id;
    return this.http.get<ClientI>(direccion,{
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'x-access-token': '' + localStorage.getItem("Token")
      })
    });
  }

  getClientByPhone(_id: any):Observable<ClientI>{
    let direccion = environment.URL + "clients/getPhone/" +_id;
    return this.http.get<ClientI>(direccion,{
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'x-access-token': '' + localStorage.getItem("Token")
      })
    });
  }

  updateClient(form:ClientI, _id:any){
    let direccion = environment.URL + "clients/"+_id;
    return this.http.put(direccion,form,{
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'x-access-token': '' + localStorage.getItem("Token")
      })
    });
  }

  deleteClient(_id:string){
    let direccion = environment.URL + "clients/"+_id;
    return this.http.delete(direccion,{
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'x-access-token': '' + localStorage.getItem("Token")
      })
    });
  }
*/
}
