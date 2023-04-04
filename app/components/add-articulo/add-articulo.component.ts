import { Component, OnInit } from '@angular/core';
import { articulos } from 'src/app/models/articulos.model';
import { ArticulosService } from 'src/app/services/articulos.service';

@Component({
  selector: 'app-add-articulos',
  templateUrl: './add-articulo.component.html',
  styleUrls: ['./add-articulo.component.css']
})
export class AddarticulosComponent implements OnInit {
  articulos: articulos = {
    nombre: "",
    descripcion: "",
    precio: 0,
    color: "",
    tallas: [],
    imagenes: [],
    cantidad: 0
  };
  submitted = false;

  constructor(private ArticulosService: ArticulosService) { }

  ngOnInit(): void {
  }

  savearticulos(): void {
    let checkbox = document.getElementsByClassName("tallas");
    for(let j = 0; j < checkbox.length; j++) {
      if ((<HTMLInputElement>checkbox[j]).checked) {
        this.articulos.tallas!.push((<HTMLInputElement>checkbox[j]).value);
      }
    }
    console.log();
    const data = {
      nombre: this.articulos.nombre,
      descripcion: this.articulos.descripcion,
      precio: this.articulos.precio,
      color: this.articulos.color,
      tallas: this.articulos.tallas,
      imagenes: this.articulos.imagenes,
      cantidad: this.articulos.cantidad
    };

    this.ArticulosService.create(data)
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