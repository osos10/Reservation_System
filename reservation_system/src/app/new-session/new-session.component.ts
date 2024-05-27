import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UsersService } from "../services/users.service";
import { Router } from "@angular/router";
import {Session} from "../model/account.model";


@Component({
  selector: 'app-new-session',
  templateUrl: './new-session.component.html',
  styleUrls: ['./new-session.component.css']
})
export class NewSessionComponent {
  public sessionForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UsersService, private router: Router) {
  }

  ngOnInit() {
    this.sessionForm = this.fb.group({
      date: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      number: ['', [Validators.required,Validators.pattern(/^[1-9]\d*$/)]]
    }, { validator: this.timeRangeValidator });
  }

  timeRangeValidator(form: FormGroup) {
    const startTime = form.get('startTime')?.value;
    const endTime = form.get('endTime')?.value;

    if (startTime && endTime) {
      const startHour = parseInt(startTime.split(':')[0]);
      const endHour = parseInt(endTime.split(':')[0]);
      const startMinute = parseInt(startTime.split(':')[1]);
      const endMinute = parseInt(endTime.split(':')[1]);

      // Checking if the start time is within the allowed ranges
      if ((startHour < 8 || (startHour === 12 && startMinute > 0)) ||
        (startHour >= 12 && startHour < 14) ||
        (startHour === 18 && startMinute > 0)) {
        return { invalidStartTime: true };
      }

      // Checking if the end time is within the allowed ranges
      if ((endHour < 8 || (endHour === 12 && endMinute > 0)) ||
        (endHour >= 12 && endHour < 14) ||
        (endHour === 18 && endMinute > 0)) {
        return { invalidEndTime: true };
      }

      // Checking if the end time is after the start time
      if (endHour < startHour || (endHour === startHour && endMinute <= startMinute)) {
        return { invalidTimeRange: true };
      }
    }

    return null; // Validation passes
  }

  saveSession() {
    // Assuming you have a Session model/interface
    let session: Session = this.sessionForm.value;
    this.userService.saveSession(session).subscribe({
      next: data => {
        alert("Session has been successfully saved!");
        //this.sessionForm.reset();
        //this.router.navigateByUrl("/sessions");
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
