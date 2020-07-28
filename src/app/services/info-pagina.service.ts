import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { infoPagina } from '../interfaces/info-pagina.interface';


@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: infoPagina = {};
  cargada = false;

  constructor(private http: HttpClient) {
    // LEER ARCHIVO JSON
      this.http.get('assets/data/info-pagina.json')
      .subscribe(( resp: infoPagina) => {
        this.cargada = true;
        this.info = resp;
      });
  }
}
