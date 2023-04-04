import { Component, OnInit } from '@angular/core';
import { articulos } from 'src/app/models/articulos.model';
import { ArticulosService } from 'src/app/services/articulos.service';

@Component({
  selector: 'app-articulos-list',
  templateUrl: './articulos-list.component.html',
  styleUrls: ['./articulos-list.component.css']
})
export class ArticulosListComponent implements OnInit {
  articulos?: articulos[];
  currentArticulos?: articulos;
  currentIndex = -1;
  filtro = '';
  currentImage = "";
  currentImagenes : String[] = [];
  scrollAnterior = false;
  seleccionado = 0;
  filtro_precio_desde = 0;
  filtro_precio_hasta = 1000;
  filtro_precio = 0;
  filtro_talla = 0;
  filtro_color = 0;
  filtro_cantidad = 0;
  criterio_cantidad = ">";
  tallas_indice = [0,0,0,0,0,0];
  color = "";
  cantidad = 0;
  tallas_filtro : string[] = [];
  constructor(private articulosService: ArticulosService) { }

  ngOnInit(): void {
    this.retrieveArticulos();
    document.getElementById("nombre-button")?.classList.add("button_seleccionado");
    this.seleccionado = 0;
    this.filtro_precio = 0;
    this.filtro_talla = 0;
    this.filtro_color = 0;
  }

  retrieveArticulos(): void {
    this.articulosService.getAll()
      .subscribe(
        data => {
          this.articulos = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveArticulos();
    this.currentArticulos = undefined;
    this.currentIndex = -1;
  }

  setActiveArticulos(articulos: articulos, index: number): void {
    this.currentArticulos = articulos;
    this.currentIndex = index;
  }


  searchFiltro(): void {
    if (this.seleccionado === 1) {
      this.articulosService.findOne(this.filtro)
        .subscribe(
          data => {
            this.articulos = []
            this.articulos.push(data);
          },
          error => {
            this.articulos = [];
          });
    } else {
      var objeto = Object.create({});
      objeto.nombre = this.filtro;
      if (this.filtro_precio === 1) {
        objeto.precio = this.filtro_precio_desde.toString() + "-" + this.filtro_precio_hasta.toString();
      }
      if (this.filtro_color === 1) {
        objeto.color = this.color;
      }
      if (this.filtro_cantidad === 1) {
        objeto.cantidad = this.cantidad.toString() + this.criterio_cantidad;
      }
      if (this.filtro_talla === 1) {
        if (this.tallas_filtro.length != 0) {
          let tallas_objeto_filtro = ""
          for (let j = 0; j < this.tallas_filtro.length; j++) {
            tallas_objeto_filtro += this.tallas_filtro[j] + "-";
          }
          objeto.tallas = tallas_objeto_filtro;
        }
        
      }
      this.articulosService.findByFiltro(objeto)
        .subscribe(
          data => {
            this.articulos = data; 
          },
          error => {
            this.articulos = [];
          });
    }
  }
  cambiar_filtro(id : any) {
    if (this.seleccionado != id) {
      if (this.seleccionado === 0){
        document.getElementById("nombre-button")?.classList.remove("button_seleccionado");
        document.getElementById("id-button")?.classList.add("button_seleccionado");
        this.filtro_precio = 0;
        this.filtro_talla = 0;
        this.filtro_color = 0;
        this.filtro_cantidad = 0;
        this.seleccionado = 1;
      } else {
        document.getElementById("id-button")?.classList.remove("button_seleccionado");
        document.getElementById("nombre-button")?.classList.add("button_seleccionado");
        this.seleccionado = 0;
      }
    }
    this.searchFiltro();
  }
  activar_filtro(filtro : string) {
    if (filtro === 'precio') {
      if (this.filtro_precio === 1) {
        this.filtro_precio = 0;
        document.getElementById("activar_precio_button")?.classList.remove("button_seleccionado");
        document.getElementById("precio-input-wrapper")!.style.display = "none";
        document.getElementById("filtro-precio-wrapper")!.style.gridTemplateRows = "5vh";
        
      } else {
        this.filtro_precio = 1;
        document.getElementById("activar_precio_button")?.classList.add("button_seleccionado");
        document.getElementById("precio-input-wrapper")!.style.display = "grid";
        document.getElementById("filtro-precio-wrapper")!.style.gridTemplateRows = "5vh 5vh";
      }
    } else if (filtro === 'talla') {
      if (this.filtro_talla === 1) {
        this.filtro_talla = 0;
        document.getElementById("activar_talla_button")?.classList.remove("button_seleccionado");
        document.getElementById("seleccionar_tallas")!.style.display = "none";
        document.getElementById("filtro-talla-wrapper")!.style.gridTemplateRows = "5vh";
      } else {
        this.filtro_talla = 1;
        document.getElementById("activar_talla_button")?.classList.add("button_seleccionado");
        document.getElementById("seleccionar_tallas")!.style.display = "grid";
        document.getElementById("filtro-talla-wrapper")!.style.gridTemplateRows = "5vh 5vh";
      }
    } else if (filtro === 'color'){
      if (this.filtro_color === 1) {
        this.filtro_color = 0;
        document.getElementById("activar_color_button")?.classList.remove("button_seleccionado");
        document.getElementById("color-wrapper")!.style.display = "none";
        document.getElementById("filtro-color-wrapper")!.style.gridTemplateRows = "5vh";
      } else {
        this.filtro_color = 1;
        document.getElementById("activar_color_button")?.classList.add("button_seleccionado");
        document.getElementById("color-wrapper")!.style.display = "grid";
        document.getElementById("filtro-color-wrapper")!.style.gridTemplateRows = "5vh 5vh";
      }
    } else {
      if (this.filtro_cantidad === 1) {
        this.filtro_cantidad = 0;
        document.getElementById("activar_cantidad_button")?.classList.remove("button_seleccionado");
        document.getElementById("cantidad-input-wrapper")!.style.display = "none";
        document.getElementById("filtro-cantidad-wrapper")!.style.gridTemplateRows = "5vh";
      } else {
        this.filtro_cantidad = 1;
        document.getElementById("activar_cantidad_button")?.classList.add("button_seleccionado");
        document.getElementById("cantidad-input-wrapper")!.style.display = "grid";
        document.getElementById("filtro-cantidad-wrapper")!.style.gridTemplateRows = "5vh 5vh";
      }
    }
    document.getElementById("info-filtros")!.style.gridTemplateColumns = (15/(2-this.filtro_color)).toString() + "vw " + (10/(2-this.filtro_precio)).toString() + "vw " + (30/(2-this.filtro_talla)).toString()+ "vw "+ (10/(2-this.filtro_cantidad)).toString() + "vw 10vw";
    
    if (this.filtro_color == 0 && this.filtro_precio == 0 && this.filtro_talla == 0) {
      document.getElementById("info-filtros")!.style.gridColumnGap = "1vw";
    } else {
      document.getElementById("info-filtros")!.style.gridColumnGap = "2vw";
    }
    this.searchFiltro();
  }
  activar_talla(talla : string) {
    if (talla === 'XS'){
      if (this.tallas_indice[0] === 1) {
        this.tallas_indice[0] = 0;
        this.tallas_filtro = this.tallas_filtro.filter(e => e !== 'XS');
        document.getElementById("seleccionar_talla_xs")?.classList.remove("button_seleccionado");
      } else {
        this.tallas_indice[0] = 1;
        this.tallas_filtro.push("XS");
        document.getElementById("seleccionar_talla_xs")?.classList.add("button_seleccionado");
      }
    } else if (talla === 'S') {
      if (this.tallas_indice[1] === 1) {
        this.tallas_indice[1] = 0;
        document.getElementById("seleccionar_talla_s")?.classList.remove("button_seleccionado");
        this.tallas_filtro = this.tallas_filtro.filter(e => e !== 'S');
      } else {
        this.tallas_filtro.push("S");
        this.tallas_indice[1] = 1;
        document.getElementById("seleccionar_talla_s")?.classList.add("button_seleccionado");
      }
    } else if (talla === 'M') {
      if (this.tallas_indice[2] === 1) {
        this.tallas_indice[2] = 0;
        this.tallas_filtro = this.tallas_filtro.filter(e => e !== 'M');
        document.getElementById("seleccionar_talla_m")?.classList.remove("button_seleccionado");
      } else {
        this.tallas_filtro.push("M");
        this.tallas_indice[2] = 1;
        document.getElementById("seleccionar_talla_m")?.classList.add("button_seleccionado");
      }
    }else if (talla === 'L') {
      if (this.tallas_indice[3] === 1) {
        this.tallas_indice[3] = 0;
        this.tallas_filtro = this.tallas_filtro.filter(e => e !== 'L');
        document.getElementById("seleccionar_talla_l")?.classList.remove("button_seleccionado");
      } else {
        this.tallas_filtro.push("L");
        this.tallas_indice[3] = 1;
        document.getElementById("seleccionar_talla_l")?.classList.add("button_seleccionado");
      }
    }else if (talla === 'XL') {
      if (this.tallas_indice[4] === 1) {
        this.tallas_indice[4] = 0;
        this.tallas_filtro = this.tallas_filtro.filter(e => e !== 'XL');
        document.getElementById("seleccionar_talla_xl")?.classList.remove("button_seleccionado");
      } else {
        this.tallas_filtro.push("XL");
        this.tallas_indice[4] = 1;
        document.getElementById("seleccionar_talla_xl")?.classList.add("button_seleccionado");
      }
    }else {
      if (this.tallas_indice[5] === 1) {
        this.tallas_indice[5] = 0;
        this.tallas_filtro = this.tallas_filtro.filter(e => e !== 'XXL');
        document.getElementById("seleccionar_talla_xxl")?.classList.remove("button_seleccionado");
      } else {
        this.tallas_filtro.push("XXL");
        this.tallas_indice[5] = 1;
        document.getElementById("seleccionar_talla_xxl")?.classList.add("button_seleccionado");
      }
    }
    this.searchFiltro();
  }
}