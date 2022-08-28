import { Component, ElementRef, OnInit } from '@angular/core';
import * as Mapboxgl from 'mapbox-gl';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-mapa',
  templateUrl: 'mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  mapa!: mapboxgl.Map;


  LatE = '' + localStorage.getItem('LatE');
  LngE = '' + localStorage.getItem('LngE');
  LatC = parseFloat(this.LatE);
  LngC = parseFloat(this.LngE);

  constructor(private router: Router) {

  }

  ngOnInit() {

    this.inicializarMapa();
    this.crearMarcador();

  }
  ngAfterViewInit(): void {


  }

  inicializarMapa() {
    (Mapboxgl as any).accessToken = environment.mapPK
    if (environment.editing) {
      this.mapa = new Mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [this.LngC, this.LatC],
        zoom: 16
      });

    } else {
      this.mapa = new Mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-89.99243177908552, 14.64490083338755],
        zoom: 13
      });
    }

  }
  crearMarcador() {
    if (environment.editing) {
      const marker = new Mapboxgl.Marker({
        draggable: true
      })
        .setLngLat([this.LngC, this.LatC])
        .addTo(this.mapa);
      marker.on('dragend', () => {
        const lngLat = marker.getLngLat();
        localStorage.setItem("Lat", lngLat.lat.toString());
        localStorage.setItem("Lng", lngLat.lng.toString());
      });
    } else {
      const marker = new Mapboxgl.Marker({
        draggable: true
      })
        .setLngLat([-89.99243177908552, 14.64490083338755])
        .addTo(this.mapa);
      marker.on('dragend', () => {
        const lngLat = marker.getLngLat();
        localStorage.setItem("Lat", lngLat.lat.toString());
        localStorage.setItem("Lng", lngLat.lng.toString());
      });
    }
  }

  return() {
    if (environment.editing) {
      this.router.navigate(["Client", localStorage.getItem("ID")]);
      environment.editing = false;
    } else {
      this.router.navigate(["Client"]);
    }
  }

  exit(){
    if (environment.editing) {
      this.router.navigate(["Client", localStorage.getItem("ID")]);
      environment.editing = false;
    } else {
      this.router.navigate(["Client"]);
    }
  }

}
