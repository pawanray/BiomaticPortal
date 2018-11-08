import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) { }
  userListConfigUrl = 'https://biometric-access.herokuapp.com/biometric/users';

featchUserList() {
  return this.http.get(this.userListConfigUrl);
}
}