import { Component } from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";
import {Reservation} from "../model/account.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UsersService} from "../services/users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent {
  reservations!: Observable<Array<Reservation>>;
  errorMessage!: string;
  searchFormGroup: FormGroup | undefined;

  constructor(private usersService: UsersService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control("")
    });
    this.handleSearchReservations();
  }

  handleSearchReservations() {
    let kw = this.searchFormGroup?.value.keyword;
    this.reservations=this.usersService.SearchReservation(kw).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }

  handleDeleteReservation(c: Reservation) {
    let conf = confirm("Are you sure?");
    if (!conf) return;
    this.usersService.deleteReservation(c.id).subscribe({
      next: (resp) => {
        this.reservations = this.reservations.pipe(
          map(data => {
            const index = data.indexOf(c);
            if (index > -1) {
              data.splice(index, 1);
            }
            return data;
          })
        );
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
