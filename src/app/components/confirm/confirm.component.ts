import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {
  error:any = false;
  model={ 
    username : localStorage.getItem('currentUser'),
    password: '',
    newPassword: '',
    cNewPassword: '',
  }
  
  constructor(private loginServ : LoginService, public router: Router) {}

  formSubmit(e) {
    e.preventDefault(); 
    this.loginServ.doConfirm(this.model.username, this.model.password, this.model.newPassword).subscribe(
      (res:any)=>{
          this.error = false
          var decodedToken = jwt_decode(res.data.token);
          localStorage.setItem('currentUser', this.model.username);
          localStorage.setItem('isUserLoggedIn', 'true');
          localStorage.setItem('identityToken', res.data.token);
          localStorage.setItem('userDisplayName', decodedToken['given_name'] + ' ' + decodedToken['family_name']);
          localStorage.setItem('userRole', decodedToken['custom:role']);
          this.router.navigate(['/']);
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
