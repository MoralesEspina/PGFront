import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/servicios/login.service';
import { LoginI } from 'src/app/modelos/login.interface';
import { Router } from '@angular/router'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required)
  })
  constructor( private login:LoginService, private router:Router) { }

  ngOnInit(): void {
    this.checkLocalStorage();

  }

  checkLocalStorage(){
    if(localStorage.getItem("Token")){
      this.router.navigate(['dashboard'])
    }
  }

  onLogin(form: LoginI){
    this.login.loginByUser(form).subscribe(data =>{
      let token:any = data;
      localStorage.setItem("Token",token.token)
      Swal.fire({
        icon: 'success',
        title: 'Inicio de Sesión Exitoso',
        text: 'Bienvenido ' + form.username ,
      })
      this.router.navigate(['dashboard']);
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.error.message,
      })
    });
  }
}
