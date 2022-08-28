import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapaComponent } from './vistas/mapa/mapa.component';
import { LoginComponent } from './vistas/login/login.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';
import { PrincipalComponent } from './vistas/principal/principal.component';
import { FooterComponent } from './plantillas/footer/footer.component';
import { HeaderComponent } from './plantillas/header/header.component';
import { ClientesComponent } from './vistas/crudClientes/clientes/clientes.component';
import { MantClienteComponent } from './vistas/crudClientes/mant-cliente/mant-cliente.component';
import { MapaDashboardComponent } from './vistas/mapa-dashboard/mapa-dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    MapaComponent,
    LoginComponent,
    PrincipalComponent,
    FooterComponent,
    HeaderComponent,
    ClientesComponent,
    MantClienteComponent,
    MapaDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
