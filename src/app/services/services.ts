import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) { }
  baseUrl = "https://biometric-access.herokuapp.com/"
  userListConfigUrl = 'biometric/users';
  

featchUserList() {
  return this.http.get(this.baseUrl + "/biometric/users");
}
feachCurrentUserDetails(userId){
    return this.http.get(this.baseUrl + "/biometric/users/" + userId)
}
deleteUser(id){
    debugger
    return this.http.delete(this.baseUrl + "/biometric/users/" + id + '/delete')
}
}