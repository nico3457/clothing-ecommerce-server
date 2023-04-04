import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { articulos } from '../models/articulos.model';

const baseUrl = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<articulos[]> {
    return this.http.get<articulos[]>(baseUrl);
  }

  get(id: any): Observable<articulos> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByFiltro(filtros: any): Observable<articulos[]> {
    var query = "";
    Object.keys(filtros).forEach(filtro => {
      query = query + filtro +"=" + filtros[filtro] + "&";
    });
    console.log(query);
    return this.http.get<articulos[]>(`${baseUrl}/filtros?${query}`);
  }

  findOne(id : any): Observable<articulos> {
    return this.http.get<articulos>(`${baseUrl}/${id}`);
  }
}