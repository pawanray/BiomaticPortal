import { Component } from '@angular/core';
import {DataService} from '../services/services'
import { Router } from '@angular/router';
@Component({
  selector: 'add-user',
  templateUrl: '../addUser/index.html',
})
export class AddUserComponent {
  constructor(private _dataService:DataService, private _router:Router){}
  public addUserHandler(dataObj:any){
  
    if(dataObj.username==""){
      document.getElementById("userName").style.display="block"
    }
    else if(dataObj.email==""){
      document.getElementById("userEmail").style.display="block"
    }
    else{
      document.getElementById("userName").style.display="none"
      document.getElementById("userEmail").style.display="none"
    this._dataService.addUser(dataObj)
    .subscribe((dataObj: any) =>  {
        this._router.navigateByUrl('/userList');
          console.log(dataObj)
      });
    console.log("data", dataObj)
  }
}
}
