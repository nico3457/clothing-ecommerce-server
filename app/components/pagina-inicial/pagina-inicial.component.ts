import { Component, OnInit } from '@angular/core';
import { articulos } from 'src/app/models/articulos.model';
import { ArticulosService } from 'src/app/services/articulos.service';
import { ViewEncapsulation } from '@angular/core';
import { ElementRef, HostListener, ViewChild } from '@angular/core';
@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PaginaInicialComponent implements OnInit {
  articulos?: articulos[];
  currentArticulos?: articulos;
  currentIndex = -1;
  nombre = '';
  currentImage = "";
  currentImagenes : String[] = [];
  scrollAnterior = false;
  lastScrollTop = 0;
  animacion = false;
  indice = 0;
  imagenes = ["inicio_img3.jpg","inicio_img1.jpg"]
  imagen_actual = "";
  constructor(private articulosService: ArticulosService) { }

  ngOnInit(): void {
    this.imagen_actual = this.imagenes[this.indice];
  }
   @HostListener('window:scroll',['$event'])
   onScroll(event : any) {
    this.indice = (this.indice + 1) % this.imagenes.length;
    this.imagen_actual = this.imagenes[this.indice];
   }
}