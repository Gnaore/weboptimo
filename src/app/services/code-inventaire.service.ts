import { Injectable, inject } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { IResponse } from '../interfaces/response';
import { Observable } from 'rxjs';
import { IBien } from '../interfaces/bien';
import { ICodeInventaire } from '../interfaces/code-inventaire';

@Injectable({
  providedIn: 'root'
})
export class CodeInventaireService {
  private url = inject(ConfigService).urlG;
  private http = inject(HttpClient);

  // create(bien: Partial<IBien> | { array: Partial<IBien>[] }): Observable<IResponse> {
  //   return this.http.post<IResponse>(`${this.url}/immobilisations`, bien);
  // }

  // update(bien: Partial<IBien>, bid: number): Observable<IResponse> {
  //   return this.http.put<IResponse>(`${this.url}/immobilisations/${bid}`, bien);
  // }

  read(): Observable<ICodeInventaire[]> {
    return this.http.get<ICodeInventaire[]>(`${this.url}/code-inventaires`);
  }

  // delete(bid: number): Observable<IResponse> {
  //   return this.http.delete<IResponse>(`${this.url}/immobilisations/${bid}`);
  // }
}
