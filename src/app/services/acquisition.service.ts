import { Injectable, inject } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponse } from '../interfaces/response';
import { IAcquisition } from '../interfaces/acquisition';

@Injectable({
  providedIn: 'root'
})
export class AcquisitionService {
  private url = inject(ConfigService).urlG;
  private http = inject(HttpClient);

  read(): Observable<IAcquisition[]> {
    return this.http.get<IAcquisition[]>(`${this.url}/acquisitions`);
  }
}
