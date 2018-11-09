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
    debugger
    this._dataService.addUser(dataObj)
    .subscribe((dataObj: any) =>  {
        debugger
        this._router.navigateByUrl('/userList');
          console.log(dataObj)
      });
    console.log("data", dataObj)
  }
}
