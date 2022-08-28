import { ClientesComponent } from './vistas/crudClientes/clientes/clientes.component';
import { MapaDashboardComponent } from './vistas/mapa-dashboard/mapa-dashboard.component';
import { MapaComponent } from './vistas/mapa/mapa.component';
import { LoginComponent } from './vistas/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './vistas/principal/principal.component';
import { MantClienteComponent } from './vistas/crudClientes/mant-cliente/mant-cliente.component';

const routes: Routes = [
  {path:'',redirectTo:'login', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'dashboard', component:PrincipalComponent},
  {path:'TableClient', component:ClientesComponent},
  {path:'Client', component:MantClienteComponent},
  {path:'Client/:id', component:MantClienteComponent},
  {path:'mapaDashboard', component:MapaDashboardComponent},
  {path:'mapa', component:MapaComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
