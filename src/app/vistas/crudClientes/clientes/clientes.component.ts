import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../servicios/client.service'
import { Router } from '@angular/router'
import { ClientI } from '../../../modelos/client.interface'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clients:ClientI[] | undefined;

  constructor(private clientService: ClientService,
              private router: Router) { }

  ngOnInit(): void {
    this.clientService.getAllClients().subscribe(data => {
      this.clients = data;
    },error=>{
        Swal.fire({
        icon: 'error',
        title: 'No se han podido obtener los clientes',
        text: error.error.message,
      })
    });
  }

  editClient(id: any){
    this.router.navigate(['Client',id])
  }

  newClient(){
    this.router.navigate(['Client']);
  }
}
