import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { infoProducto } from '../interfaces/productos.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: infoProducto[] = [];
  productoBuscado: infoProducto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    return new Promise( (resolve, reject) => {
      this.http.get('https://portafolio-angular-76356.firebaseio.com/productos_idx.json')
      .subscribe( (resp: infoProducto[]) => {
        this.productos = resp;
        setTimeout(() => {
          this.cargando = false;
        }, 500);
        resolve();
      });
    });
  }

  getProducto(id: string) {
    // ALT + 96 PARA USAR LOS BACKTICKS E IMPLEMENTAR LOS TEMPLATES LITERALES DEL ESTÁNDAR ES6 Y HACER LA INSERCIÓN DE STRINGS EN LA URL
    return this.http.get(`https://portafolio-angular-76356.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto(termino: string) {
    if (this.productos.length === 0) {
    // ESPERAR CARGA DE PRODUCTOS
      this.cargarProductos().then( ()=> {
        // EJECUTARSE DESPUES DE TENER LOS PRODUCTOS CARGADOS
        // APLICAR FILTRO
        this.filtrarProductos(termino);
      });
    } else {
    // APLICAR LA BUSQUEDA
    this.filtrarProductos(termino);
    }
  }

  private filtrarProductos(termino: string) {
    this.productoBuscado = [];
    termino = termino.toLocaleLowerCase();
    this.productos.forEach(prod=> {
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if (prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0) {
        this.productoBuscado.push(prod);
      }
    });
  }
}
