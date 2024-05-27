import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { NavbarComponent } from './navbar/navbar.component';
import { UsersComponent } from './users/users.component';
import { JuryComponent } from './jury/jury.component';
import { NewUserComponent } from './new-user/new-user.component';
import { SessionsComponent } from './sessions/sessions.component';
import { NewSessionComponent } from './new-session/new-session.component';
import { ReservationComponent } from './reservation/reservation.component';
import { NewResrvationComponent } from './new-resrvation/new-resrvation.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UsersComponent,
    JuryComponent,
    NewUserComponent,
    SessionsComponent,
    NewSessionComponent,
    ReservationComponent,
    NewResrvationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
