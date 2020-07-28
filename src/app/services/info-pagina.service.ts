import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { infoPagina } from '../interfaces/info-pagina.interface';


@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: infoPagina = {};
  cargada = false;

  equipo: any[] = [];

  constructor(private http: HttpClient) {
    this.cargarInfo();
    this.cargarEquipo();
  }

  // CARGANDO DATOS DEL ARCHIVO JSON LOCAL
  private cargarInfo() {
    // LEER ARCHIVO JSON
    this.http.get('assets/data/info-pagina.json')
    .subscribe(( resp: infoPagina) => {
      this.cargada = true;
      this.info = resp;
    });
  }

  // CARGANDO DATOS DEL ARCHIVO JSON DE FIREBASE
  private cargarEquipo() {
    // LEER ARCHIVO JSON
    this.http.get('https://portafolio-angular-76356.firebaseio.com/equipo.json')
    .subscribe(( resp: any []) => {
      this.equipo = resp;
    });
  }

}
