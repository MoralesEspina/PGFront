import { ClientI } from "../modelos/client.interface";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from './../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class ClientService {

  constructor(private http:HttpClient) {
  }


  createClient(form:ClientI){
    let direccion = environment.URL + "clients/";
    return this.http.post(direccion,form,{
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'x-access-token': '' + localStorage.getItem("Token")
      })
    });
  }


  getAllClients():Observable<ClientI[]>{
    let direccion = environment.URL + "clients";
    return this.http.get<ClientI[]>(direccion,{
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'x-access-token': '' + localStorage.getItem("Token")
      })
    });
  }


  getClientById(_id: any):Observable<ClientI>{
    let direccion = environment.URL + "clients/" +_id;
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

}
