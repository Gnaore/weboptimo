import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate  {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
   
    const currentUser = localStorage.getItem('currentUser');
    const currentUserJSON = JSON.parse(currentUser!.toString());
 //alert(currentUserJSON.accessToken)

    if (currentUserJSON.accessToken) {
      return true;
    } else {
      // Si l'utilisateur n'est pas authentifié, redirigez-le vers la page de connexion
      this.router.navigate(['/auth']);
      return false;
    }
  }
}
