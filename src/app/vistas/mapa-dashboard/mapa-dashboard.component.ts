import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-mapa-dashboard',
  templateUrl: './mapa-dashboard.component.html',
  styleUrls: ['./mapa-dashboard.component.css']
})
export class MapaDashboardComponent implements OnInit {

  mapa!: mapboxgl.Map;

  LatE = '' + localStorage.getItem('LatE');
  LngE = '' + localStorage.getItem('LngE');
  LatC = parseFloat(this.LatE);
  LngC = parseFloat(this.LngE);

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.inicializarMapa();

  }

  inicializarMapa(){
    (Mapboxgl as any).accessToken = environment.mapPK
      this.mapa = new Mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/satellite-streets-v11',
        center: [-89.989074, 14.6377219],
        zoom: 13
      });

  }
}
