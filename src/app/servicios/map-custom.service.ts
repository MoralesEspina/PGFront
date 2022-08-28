import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl' ;
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

@Injectable({
  providedIn: 'root'
})
export class MapCustomService {

  mapbox = (mapboxgl as typeof mapboxgl);
  map!: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 14.636676228946675 ;
  lng = -89.99137169695203;
  zoom = 13;
  wayPoints: Array<any> = [];
  markerDriver: any = null;

  constructor() {

    this.mapbox.accessToken = environment.mapPK;
  }

  buildMap(): Promise<any> {

    return new Promise((resolve, reject) => {
      try {
        this.map = new mapboxgl.Map({
          container: 'map',
          style: this.style,
          zoom: this.zoom,
          center: [this.lng, this.lat]
        });


        const geocoder = new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,

        });

        resolve({
          map: this.map,
          geocoder
        });
      }catch(e) {
        reject(e);
      }
    });
  }
}
