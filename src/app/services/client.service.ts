import { Injectable, inject } from '@angular/core';
import { IClient } from '../interfaces/client';
import { Observable } from 'rxjs';
import { IResponse } from '../interfaces/response';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private url = inject(ConfigService).urlG;
  private http = inject(HttpClient);

  create(client: Partial<IClient>): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.url}/clients`, client);
  }

  update(client: Partial<IClient>, cid: number): Observable<IResponse> {
    return this.http.put<IResponse>(`${this.url}/clients/${cid}`, client);
  }

  read(): Observable<IClient[]> {
    return this.http.get<IClient[]>(`${this.url}/clients`);
  }

  delete(cid: number): Observable<IResponse> {
    return this.http.delete<IResponse>(`${this.url}/clients/${cid}`);
  }
}
