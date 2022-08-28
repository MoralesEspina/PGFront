import { environment } from './../../environments/environment.prod';
import { LoginI } from "../modelos/login.interface";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class LoginService {


  constructor(private http:HttpClient) { }

  loginByUser(form:LoginI){
    let direccion = environment.URL + "auth/signin";
    return this.http.post(direccion,form);
  }

  logOut(){
    localStorage.removeItem('Token');
  }

  logedIn(){
    return !!localStorage.getItem('Token');
  }

}
