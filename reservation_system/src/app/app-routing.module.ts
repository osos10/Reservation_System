import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersComponent} from "./users/users.component";
import {NewUserComponent} from "./new-user/new-user.component";
import {JuryComponent} from "./jury/jury.component";
import {SessionsComponent} from "./sessions/sessions.component";
import {NewSessionComponent} from "./new-session/new-session.component";
import {ReservationComponent} from "./reservation/reservation.component";
import {NewResrvationComponent} from "./new-resrvation/new-resrvation.component";

const routes: Routes = [
  { path :"users", component : UsersComponent},
  { path :"new-user", component : NewUserComponent},
  { path :"jury", component : JuryComponent},
  { path :"sessions", component : SessionsComponent},
  { path :"new-session", component : NewSessionComponent},
  { path :"Reservations", component : ReservationComponent},
  { path :"new-reservation", component : NewResrvationComponent}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
