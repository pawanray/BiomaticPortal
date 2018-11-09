import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
  import { from } from 'rxjs';
  import {DataService} from '../services/services'
@Component({
  //selector: 'user-details',
  templateUrl: '../userDetails/index.html',
})
export class UserDetailsComponent {
  currentUserDetail:any;
  faceEnrolledBox= 'none';
  userId:string
  constructor(private _route:ActivatedRoute, private _dataService:DataService){
    this.userId = this._route.snapshot.paramMap.get('userId')
    console.log(this._route.snapshot.paramMap.get('userId'))
  }  

  ngOnInit(){
    debugger
      this._dataService.feachCurrentUserDetails(this.userId)
        .subscribe((data: any) =>  {
          debugger
          var userArray = [];
          userArray.push(data)
          this.currentUserDetail = userArray
            console.log("userData", data)
        });
    }

}
