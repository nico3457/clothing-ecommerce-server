import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticulosListComponent } from './components/articulos-list/articulos-list.component';
import { ArticulosDetailsComponent } from './components/articulos-details/articulos-details.component';
import { AddarticulosComponent } from './components/add-articulo/add-articulo.component';
import { PaginaInicialComponent } from './components/pagina-inicial/pagina-inicial.component';
import { ModificarArticulosComponent } from './components/modificar-articulo/modificar-articulo.component';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: PaginaInicialComponent },
  { path: 'articulos', component: ArticulosListComponent },
  { path: 'articulos/:id', component: ArticulosDetailsComponent },
  { path: 'add', component: AddarticulosComponent },
  { path: 'articulos/modificar/:id', component: ModificarArticulosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }