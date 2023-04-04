import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddarticulosComponent } from './components/add-articulo/add-articulo.component';
import { ArticulosDetailsComponent } from './components/articulos-details/articulos-details.component';
import { ArticulosListComponent } from './components/articulos-list/articulos-list.component';
import { PaginaInicialComponent } from './components/pagina-inicial/pagina-inicial.component';
import { ModificarArticulosComponent } from './components/modificar-articulo/modificar-articulo.component';

@NgModule({
  declarations: [
    AppComponent,
    AddarticulosComponent,
    ArticulosDetailsComponent,
    ArticulosListComponent,
    PaginaInicialComponent,
    ModificarArticulosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
