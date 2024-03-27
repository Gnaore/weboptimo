import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  urlG: string = 'https://optimo.fintechgodwin.com/api';
  private authToken: string | null = null;

  getAuthToken(): string | null {
    this.authToken = JSON.parse(localStorage.getItem('access_token')!).accessToken;
    return this.authToken;
  }
}
