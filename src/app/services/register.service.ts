import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient) {}
  public doRegister(args) {
    return this.httpClient.post(`${environment.apiUrl}/reg`,args);
  }

}
