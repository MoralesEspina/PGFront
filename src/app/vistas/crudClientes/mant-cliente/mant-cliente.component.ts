import { environment } from './../../../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/servicios/client.service';
import { ClientI } from 'src/app/modelos/client.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-mant-cliente',
  templateUrl: './mant-cliente.component.html',
  styleUrls: ['./mant-cliente.component.css']
})
export class MantClienteComponent implements OnInit {

  editing: boolean = false;
  coordenades: boolean = false;

  constructor(private clientService: ClientService,
    private router: Router,
    private _activatedRoute: ActivatedRoute) { }

  modeloClient: ClientI | undefined;

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
    this.loadClient();
  }

  deleteLocalStorage(){
    /*localStorage.removeItem("LngE");
    localStorage.removeItem("LatE")
    localStorage.removeItem("Lat")
    localStorage.removeItem("Lng")*/
  }

  loadClient() {
    let id_entrada = this._activatedRoute.snapshot.params['id'];
    if (id_entrada) {
      this.editing = true;
      environment.editing = true;
      this.clientService.getClientById(id_entrada).subscribe(
        data => {
          this.modeloClient = data;
          this.formCliente.setValue({
            '_id': this.modeloClient._id,
            'name': this.modeloClient.name,
            'direction': this.modeloClient.direction,
            'latitude': this.modeloClient.latitude,
            'length': this.modeloClient.length,
            'phoneNumber': this.modeloClient.phoneNumber,
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
    } else {
      this.editing = false;
      environment.editing = false;
    }
  }

  aggClient() {
    if (this.editing) {
      const Cli: ClientI = {
        name: this.formCliente.value.name,
        nit: this.formCliente.value.nit,
        phoneNumber: this.formCliente.value.phoneNumber,
        direction: this.formCliente.value.direction,
        latitude: ''+localStorage.getItem("Lat"),
        length: ''+localStorage.getItem("Lng"),
        references: this.formCliente.value.references,
        _id: this.formCliente.value._id
      }
      this.clientService.updateClient(Cli, Cli._id).subscribe(data => {
        environment.editing = false;
        this.editing = false;
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Cliente Actualizado con Exito',
          showConfirmButton: false,
          timer: 800
        })
        this.deleteLocalStorage();
        this.router.navigate(['TableClient']);
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'No se han podido actualizar los campos',
          text: error.error.message,
        })
      });

    } else {
      environment.editing = false;
        this.editing = false;
      const Cli: ClientI = {
        name: this.formCliente.value.name,
        nit: this.formCliente.value.nit,
        phoneNumber: this.formCliente.value.phoneNumber,
        direction: this.formCliente.value.direction,
        latitude: ''+localStorage.getItem("Lat"),
        length: ''+localStorage.getItem("Lng"),
        references: this.formCliente.value.references,
        _id: ''
      }
      this.clientService.createClient(Cli).subscribe(data => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Cliente Creado con Exito',
          showConfirmButton: false,
          timer: 800
        })
        this.deleteLocalStorage();
        this.router.navigate(['TableClient']);
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'No se ha podido ingresar el cliente',
          text: error.error.message,
        })
      });
    }
  }

  deleteClient(_id: string) {
    Swal.fire({
      title: 'Estas Seguro?',
      text: "No Podras Revertir esta Acción!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No, Cancela!',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientService.deleteClient(_id).subscribe(data => {
          Swal.fire(
            'Eliminado!',
            'Cliente Eliminado con Exito',
            'success'
          )
          this.deleteLocalStorage();
          this.router.navigate(['TableClient']);
        }, error => {
          Swal.fire({
            icon: 'error',
            title: 'No se ha podido eliminar el cliente',
            text: error.error.message,
          })
        });
      }
    })
  }

  map(){
    let id_entrada = this._activatedRoute.snapshot.params['id'];
    if(this.editing){
      environment.editing = true;
      localStorage.setItem('ID',id_entrada)
      localStorage.setItem('LatE',this.formCliente.value.latitude )
      localStorage.setItem('LngE',this.formCliente.value.length)
      this.router.navigate(['mapa']);
    }else{
      environment.editing = false;
      this.editing = false;
      this.router.navigate(['mapa']);
    }


  }
  exit() {
    environment.editing = false;
    this.editing = false;
    this.deleteLocalStorage();
    this.router.navigate(['TableClient']);
  }
}
