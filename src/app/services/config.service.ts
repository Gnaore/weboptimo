import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  urlG: string = 'http://localhost/api_smart_stock';
}
