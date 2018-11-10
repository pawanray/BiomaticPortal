import { Component } from '@angular/core';
import {DataService} from '../services/services'
@Component({
  selector: 'user-list',
  templateUrl: '../userList/index.html',
  //styleUrls: ['./app.component.scss']
})
export class UserListComponent {
  title = 'userlist';
  userList:any
  constructor(private _dataService:DataService){}
  
  ngOnInit(){
      
        this._dataService.featchUserList()
          .subscribe((data: any) =>  {
            this.userList=data
              console.log(data)
          });
      }
   
      deleteUserHandler(id){
        this._dataService.deleteUser(id)
        .subscribe((deleteData: any) =>  {
              console.log(deleteData)
          });
      }
}
