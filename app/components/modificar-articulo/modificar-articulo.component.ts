import { Component, OnInit } from '@angular/core';
import { articulos } from 'src/app/models/articulos.model';
import { ArticulosService } from 'src/app/services/articulos.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modificar-articulos',
  templateUrl: './modificar-articulo.component.html',
  styleUrls: ['./modificar-articulo.component.css']
})
export class ModificarArticulosComponent implements OnInit {
  articulos: articulos = {
    nombre: "",
    descripcion: "",
    precio: 0,
    color: "",
    tallas: [],
    imagenes: [],
    cantidad: 0
  };
  id = "";
  submitted = false;

  constructor(
    private articulosService: ArticulosService,
    private route: ActivatedRoute,
    private router: Router) { }   

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getArticulos(this.id);
  }

  getArticulos(id: string): void {
    this.articulosService.get(id)
      .subscribe(
        data => {
          this.articulos = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  updateArticulo(): void {
    var tallas_array: string[] = [];
    Array.from(document.getElementsByClassName("tallas")).forEach(elemento => {
      if ((<HTMLInputElement>elemento).checked) {
        tallas_array.push((<HTMLInputElement>elemento).value);
      }
    });
    const data = {
      nombre: this.articulos.nombre,
      descripcion: this.articulos.descripcion,
      precio: this.articulos.precio,
      color: this.articulos.color,
      tallas: tallas_array,
      imagenes: this.articulos.imagenes,
      cantidad: this.articulos.cantidad
    };

    this.articulosService.update(this.id, data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          (<HTMLDivElement>document.getElementById("mensaje-borrar")).style.display = "block";
        },
        error => {
          console.log(error);
        }); 
  }
}