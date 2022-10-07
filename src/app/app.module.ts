import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {  HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

/*Angular Material*/
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


/*Componentes*/
import { AppComponent } from './app.component';
import { MapaComponent } from './vistas/mapa/mapa.component';
import { LoginComponent } from './vistas/login/login.component';
import { ClientesComponent } from './vistas/crudClientes/clientes/clientes.component';
import { MantClienteComponent } from './vistas/crudClientes/mant-cliente/mant-cliente.component';
import { MapaDashboardComponent } from './vistas/mapa-dashboard/mapa-dashboard.component';
import { PedidosComponent } from './vistas/crudPedido/pedidos/pedidos.component';
import { PrincipalComponent } from './vistas/principal/principal.component';
import { FooterComponent } from './plantillas/footer/footer.component';
import { HeaderComponent } from './plantillas/header/header.component';
import { PipesPipe } from './pipes/pipes.pipe';
import { MantProductosComponent } from './vistas/crudProductos/mant-productos/mant-productos.component';
import { ProductosComponent } from './vistas/crudProductos/productos/productos.component';
import { MantPedidosComponent } from './vistas/crudPedido/mant-pedidos/mant-pedidos.component';
import { SidebarComponent } from './plantillas/sidebar/sidebar.component';


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
    MapaDashboardComponent,
    PedidosComponent,
    PipesPipe,
    MantProductosComponent,
    ProductosComponent,
    MantPedidosComponent,
    SidebarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
