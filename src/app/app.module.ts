import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './services/services';
import { AppComponent } from './app.component';
import { UserListComponent } from '../app/userList/index';
import { AddUserComponent } from '../app/addUser/index';
const appRoutes: Routes = [
  { path: 'user-list', component: UserListComponent },
  { path: 'add-user',      component: AddUserComponent },
 
  //{ path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    AddUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
