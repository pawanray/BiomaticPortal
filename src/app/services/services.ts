import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) { }
  public headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  baseUrl = "https://biometric-access.herokuapp.com/"
  userListConfigUrl = 'biometric/users';
  
  

featchUserList() {
  return this.http.get(this.baseUrl + "/biometric/users");
}
feachCurrentUserDetails(userId){
    return this.http.get(this.baseUrl + "/biometric/users/" + userId)
}
deleteUser(id){
    
    return this.http.delete(this.baseUrl + "/biometric/users/" + id + '/delete')
}
addUser(obj){
    
    return this.http.post(this.baseUrl + "/biometric/register/" , obj)
}
} 