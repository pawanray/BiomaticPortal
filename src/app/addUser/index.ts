import { Component } from '@angular/core';

@Component({
  selector: 'add-user',
  templateUrl: '../addUser/index.html',
})
export class AddUserComponent {
  public addUserHandler(data:any){
    console.log("data", data)
  }
}
