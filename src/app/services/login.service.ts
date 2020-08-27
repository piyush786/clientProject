import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) {}
  public doLogin(username, password) {
    return this.httpClient.post(`${environment.apiUrl}/auth`,{username, password});
  }

  public doConfirm(username, password, newPassword  ) {
    return this.httpClient.post(`${environment.apiUrl}/auth`,{username, password, newPassword});
  }


}
