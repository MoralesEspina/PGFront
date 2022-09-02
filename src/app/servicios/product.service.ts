import { ProductI } from './../modelos/product.interface';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from './../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private http:HttpClient) {
  }


  createProduct(form:ProductI){
    let direccion = environment.URL + "products/";
    return this.http.post(direccion,form,{
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'x-access-token': '' + localStorage.getItem("Token")
      })
    });
  }


  getAllProducts():Observable<ProductI[]>{
    let direccion = environment.URL + "products";
    return this.http.get<ProductI[]>(direccion,{
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'x-access-token': '' + localStorage.getItem("Token")
      })
    });
  }

  updateProduct(form:ProductI, _id:any){
    let direccion = environment.URL + "products/"+_id;
    return this.http.put(direccion,form,{
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'x-access-token': '' + localStorage.getItem("Token")
      })
    });
  }

  getProductById(_id: any):Observable<ProductI>{
    let direccion = environment.URL + "products/" +_id;
    return this.http.get<ProductI>(direccion,{
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'x-access-token': '' + localStorage.getItem("Token")
      })
    });
  }

/*


  getClientByPhone(_id: any):Observable<ClientI>{
    let direccion = environment.URL + "clients/getPhone/" +_id;
    return this.http.get<ClientI>(direccion,{
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
