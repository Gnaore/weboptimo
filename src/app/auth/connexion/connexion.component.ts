import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {
  
  private authFormBuilder = inject(FormBuilder)
  authForm: FormGroup
  
  constructor(private authService: AuthService,private router: Router){
    this.authForm = this.authFormBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    })
    
  }

  ngOnInit() {
  }


  login(data: any) {
    const body = {
      "email": data.email,
      "password": data.password
    }
    this.authService.login(body).subscribe(ret=>{
      if(ret.accessToken){
        this.router.navigate(['/admin']);
      }

    }, (err)=>{
      localStorage.clear();
    });
  }

}
