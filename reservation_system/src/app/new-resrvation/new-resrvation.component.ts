import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../services/users.service";
import {Router} from "@angular/router";
import {Reservation, User} from "../model/account.model";
enum Status {
  Confirmed = "Confirmed",
  Cancelled = "Cancelled"

}
@Component({
  selector: 'app-new-resrvation',
  templateUrl: './new-resrvation.component.html',
  styleUrl: './new-resrvation.component.css'
})
export class NewResrvationComponent {
  public userForm!:FormGroup;
  public reservationStatus = Object.values(Status);
  constructor(private fb: FormBuilder, private userService:UsersService,private router:Router) {
  }
  ngOnInit() {
    this.userForm = this.fb.group({
      user: this.fb.control('', [Validators.required]),
      session: this.fb.control('', [Validators.required]),
      reservationStatus: this.fb.control(this.reservationStatus[0], [Validators.required])    });
  }

  saveReservation() {
    // Assuming you have obtained the user ID and session ID from the form
    const userId = this.userForm.value.user;
    const sessionId = this.userForm.value.session;

    // Fetch user and session data asynchronously
    this.userService.getUserById(userId).subscribe(user => {
      this.userService.getSessionById(sessionId).subscribe(session => {
        // Construct the reservation object with fetched user and session data
        const reservation: Reservation = {
          id: 0, // You may assign an appropriate value or handle it on the server
          ReservationStatus: this.userForm.value.reservationStatus,
          user: user,
          session: session
        };

        // Save the reservation
        this.userService.saveReservation(reservation).subscribe({
          next: data => {
            alert("User has been successfully saved!");
            // Optionally reset the form after successful save
            // this.userForm.reset();
            // Optionally navigate to another route after successful save
            // this.router.navigateByUrl("/users");
          },
          error: err => {
            console.log(err);
            // Handle error if necessary
          }
        });
      });
    });
  }
}
