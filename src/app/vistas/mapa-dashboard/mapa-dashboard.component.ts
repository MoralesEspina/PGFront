import { ClientService } from './../../servicios/client.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment.prod';
import { ClientI } from 'src/app/modelos/client.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mapa-dashboard',
  templateUrl: './mapa-dashboard.component.html',
  styleUrls: ['./mapa-dashboard.component.css']
})
export class MapaDashboardComponent implements OnInit {

  mapa!: mapboxgl.Map;
  modeloClient: ClientI | undefined;

  LatE = '' + localStorage.getItem('LatE');
  LngE = '' + localStorage.getItem('LngE');
  LatC = parseFloat(this.LatE);
  LngC = parseFloat(this.LngE);

  constructor(private router: Router,
    private clientService:ClientService ) { }

  ngOnInit(): void {
    this.inicializarMapa();
    this.crearMarcador();

  }

  inicializarMapa(){
    (Mapboxgl as any).accessToken = environment.mapPK
      this.mapa = new Mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/satellite-streets-v11',
        center: [-89.98796170309063, 14.633315814566743],
        zoom: 13
      });
  }

  crearMarcador(){
      this.clientService.getAllClients().subscribe(
        data => {
          for (let index = 0; index < data.length; index++) {
            const element = data[index];
            const popup = new Mapboxgl.Popup({ offset: 25 }).setHTML(
              `<strong>${element.name}</strong><p>${element.direction}</p><p>${element.references}</p>`
              );
            var Lat = parseFloat(element.latitude);
            var Lng = parseFloat(element.length);
            const marker = new Mapboxgl.Marker({ color: 'blue', rotation: 30
            })
              .setLngLat([Lng, Lat])
              .addTo(this.mapa)
              .setPopup(popup);
          }
        }, error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error.message,
          })
        })
    }
  }
