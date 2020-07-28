import { Component } from '@angular/core';
import { InfoPaginaService } from './services/info-pagina.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // SE HACE LA INYECCION DE DEPENDENCIA EN EL CONSTRUCTOR
  constructor(public infoPaginaService: InfoPaginaService) {

  }
}
