import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms'
import { DataService } from './services/services';
import { AppComponent } from './app.component';
import { UserListComponent } from '../app/userList/index';
import { AddUserComponent } from '../app/addUser/index';
import { UserDetailsComponent } from '../app/userDetails/index';
import { faceEnrolmentComponent } from '../app/faceEnrolment/index';
import { voiceEnrolmentComponent } from '../app/voiceEnrolment/index';
import { from } from 'rxjs';
const appRoutes: Routes = [
  { path: 'userList', component: UserListComponent, },
  { path: 'addUser',    component: AddUserComponent },
  { path: 'userList/:userId', component: UserDetailsComponent },
  { path: 'faceVerify',    component: faceEnrolmentComponent },
  { path: 'voiceVerify',    component: voiceEnrolmentComponent },
 
  { path: '**', redirectTo: '/userList', pathMatch: 'full' },
];


@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    AddUserComponent,
    UserDetailsComponent,
    faceEnrolmentComponent,
    voiceEnrolmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
