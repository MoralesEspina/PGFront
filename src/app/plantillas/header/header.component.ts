import { LoginComponent } from './../../vistas/login/login.component';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private loginSerive:LoginService,
              private router:Router) { }

  ngOnInit(): void {
  }

  logedIn(){
    return this.loginSerive.logedIn();
  }

  onLogOut(){
       this.loginSerive.logOut();
       this.router.navigate(['login']);
  }

}
