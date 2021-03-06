import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  error:any = false;
  model={ 
    username: '',
    password: ''
  }
  
  constructor(private loginServ : LoginService, public router: Router) {}

  formSubmit(e) {
    e.preventDefault(); 
    this.loginServ.doLogin(this.model.username, this.model.password).subscribe(
      (res:any)=>{
        if (res.data.newPasswordRequired) {
          localStorage.setItem('currentUser', this.model.username);
          this.router.navigate(['/confirm']);
        }
        else {
          this.error = false
          var decodedToken = jwt_decode(res.data.token);
          localStorage.setItem('currentUser', this.model.username);
          localStorage.setItem('isUserLoggedIn', 'true');
          localStorage.setItem('identityToken', res.data.token);
          localStorage.setItem('userDisplayName', decodedToken['given_name'] + ' ' + decodedToken['family_name']);
          localStorage.setItem('userRole', decodedToken['custom:role']);
          this.router.navigate(['/']);
        }
      },
     (error)=>{
        this.error = "Invalid login. Please try again."
        localStorage.setItem('isUserLoggedIn', 'false');
        localStorage.setItem('identityToken', '');
        localStorage.setItem('userDisplayName', '');
        localStorage.setItem('userRole', '');
     }
    )

  }
}
