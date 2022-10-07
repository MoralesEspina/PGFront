import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientI } from 'src/app/modelos/client.interface';
import { ClientService } from 'src/app/servicios/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  constructor(private clientService: ClientService,
    private router: Router) { }

    modeloClient: ClientI | undefined;
    clients:ClientI[] | undefined;

  formCliente = new FormGroup({
    _id: new FormControl(''),
    name: new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(50)]),
    nit: new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(10)]),
    direction: new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(100)]),
    latitude: new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(100)]),
    length: new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(100)]),
    phoneNumber: new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]),
    references: new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(100)])
  })

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

  /*loadClient(phone:ClientI) {
    if (phone.phoneNumber) {
      this.clientService.getClientByPhone(phone.phoneNumber).subscribe(
        data => {
          console.log(data)
          this.modeloClient = data;
          this.formCliente.setValue({
            'name': this.modeloClient.name,
            'direction': this.modeloClient.direction,
            'nit': this.modeloClient.nit,
            'references': this.modeloClient.references
          });
        }, error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error.message,
          })
        })
    }
  }*/

}
