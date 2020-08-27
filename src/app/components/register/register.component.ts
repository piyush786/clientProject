import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  error = false;

  formSubmit(e) {
    e.preventDefault(); 

  }


}
