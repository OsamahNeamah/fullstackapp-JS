import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { UsersviewComponent } from './components/usersview/usersview.component';
import { UseraddComponent } from './components/useradd/useradd.component';
import { UserupdateComponent } from './components/userupdate/userupdate.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersviewComponent,
    UseraddComponent,
    UserupdateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
