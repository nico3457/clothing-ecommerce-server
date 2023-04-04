import { Component, OnInit } from '@angular/core';
import { ArticulosService } from 'src/app/services/articulos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { articulos } from 'src/app/models/articulos.model';

@Component({
  selector: 'app-articulos-details',
  templateUrl: './articulos-details.component.html',
  styleUrls: ['./articulos-details.component.css']
})
export class ArticulosDetailsComponent implements OnInit {
  currentArticulos: articulos = {
    nombre: "",
    descripcion: "",
    precio: 0,
    color: "",
    tallas: [],
    imagenes: [],
    cantidad: 5
  };
  currentImage = "";
  currentImagenes : String[] = [];
  scrollAnterior = false;
  message = '';
  tallasPrint : String[] = [];
  colapsed = false;
  id = "";
  submitted = false;
  offset = 250;

  constructor(
    private articulosService: ArticulosService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.id = this.route.snapshot.params['id'];
    this.getArticulos(this.id);
    this.currentImage = "0";
    this.currentImagenes = [];
    if (this.currentArticulos.imagenes) {
      try {
        this.currentArticulos.imagenes.forEach(imagen => {
          this.currentImagenes.push("http://localhost:8080/../../imagenes/" + imagen);
        });
      } catch(e) {}
    }
  }

  getArticulos(id: string): void {
    this.articulosService.get(id)
      .subscribe(
        data => {
          this.currentArticulos = data;
          this.offset = this.currentArticulos.descripcion!.indexOf(".")+1;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updatePublished(status: boolean): void {
    const data = {
      nombre: this.currentArticulos.nombre,
      descripcion: this.currentArticulos.descripcion,
      precio: this.currentArticulos.precio,
      color: this.currentArticulos.color,
      tallas: this.currentArticulos.tallas,
      imagenes: this.currentArticulos.imagenes,
      cantidad: this.currentArticulos.cantidad
    };

    this.articulosService.update(this.currentArticulos._id, data)
      .subscribe(
        response => {
          this.currentArticulos.nombre = data.nombre;
          console.log(response);
          this.message = response.message;
        },
        error => {
          console.log(error);
        });
  }


  scroll(id: any) {
    var el = document.getElementById("imagen" + String(id));
    this.currentImage = String(id);
    if (el) {
      el.scrollIntoView(false);
    }
    this.scrollAnterior = true;
  }
  scrollImage() {
    if (!this.scrollAnterior) {
      var siguiente = parseInt(this.currentImage)+1 > this.currentImagenes.length  ? 0 : parseInt(this.currentImage)+1;
      this.currentImage = String(siguiente);
      var el = document.getElementById("imagen" + String(siguiente));
      if (el) {
        el.scrollIntoView(false);
      }
        
      this.scrollAnterior = true;
    } else {
      this.scrollAnterior = false;
    }
  }
  colapseTallas(id: any) {
    if (this.currentArticulos.tallas) {
      if (!this.colapsed) {
        this.colapsed = true;
        for (let i = 0; i < this.currentArticulos.tallas.length; i++ ) {
          if (id != i) {
            (<HTMLDivElement>document.getElementById("option" + String(i))).style.display = "none";
          } else {
            (<HTMLDivElement>document.getElementById("option" + String(i))).style.fontWeight = "600";
          }
        }
      } else {
        this.colapsed = false;
        for (let i = 0; i < this.currentArticulos.tallas.length; i++ ) {
          (<HTMLDivElement>document.getElementById("option" + String(i))).style.display = "block";
          (<HTMLDivElement>document.getElementById("option" + String(i))).style.fontWeight = "normal";
        }
      }
    }
  }
  borrar_articulo() {
    this.articulosService.delete(this.currentArticulos._id)
      .subscribe(
        data => {
          this.currentArticulos = data;
          console.log(data);
          this.submitted = true;
          (<HTMLDivElement>document.getElementById("mensaje-borrar")).style.display = "block";
        },
        error => {
          console.log(error);
        });
  }
  changeOffsetDescripcion() {
    if (this.offset === this.currentArticulos.descripcion!.length) {
      this.offset = this.currentArticulos.descripcion!.indexOf(".")+1;
      document.getElementById("ver_toogle")!.innerHTML = "Ver más";
    } else {
      this.offset = this.currentArticulos.descripcion!.length;
      document.getElementById("ver_toogle")!.innerHTML = "Ver menos";
    }
  }
}