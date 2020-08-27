import { Component } from '@angular/core';
import { RegisterService } from '../../services/register.service'

@Component({
  selector: 'app-root',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  error:any = false;
  showForm = true;
  successMessage = false;
  model:any={};
  constructor(private registerServ : RegisterService) { }

  formSubmit(e) {
    e.preventDefault(); 
    const tenant:any = {
      id: '',
        companyName: this.model.companyName,
        accountName: this.model.companyName,
        ownerName: this.model.email,
        tier: this.model.plan,
        email: this.model.email,
        userName: this.model.email,
        firstName: this.model.firstName,
        lastName: this.model.lastName
    }
    if (tenant.email || tenant.companyName) {
       this.error = "User name and company name are required. Please enter these values.";
    }
    console.log(tenant)
    this.registerServ.doRegister(tenant).subscribe(
      (res:any)=>{
        console.log('Registration success');
        this.showForm = false;
        this.successMessage = true;
      },
     (error)=>{
      this.error = "Unable to create new account";
     })
  }
}
