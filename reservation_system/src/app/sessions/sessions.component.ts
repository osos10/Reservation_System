import { Component, OnInit } from '@angular/core';
import { catchError, map, Observable, throwError } from "rxjs";

import { FormBuilder, FormGroup } from "@angular/forms";
import { UsersService } from "../services/users.service";
import { Router } from "@angular/router";
import { Session } from "../model/account.model";


@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.css'
})
export class SessionsComponent implements OnInit{
  sessions!: Observable<Array<Session>>;
  errorMessage!: string;
  searchFormGroup: FormGroup | undefined;

  constructor(private usersService: UsersService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control("")
    });
    this.handleSearchSessions();
  }

  handleSearchSessions() {
    let kw = this.searchFormGroup?.value.keyword;
    this.sessions=this.usersService.SearchSessions(kw).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }

  handleDeleteSession(c: Session) {
    let conf = confirm("Are you sure?");
    if (!conf) return;
    this.usersService.deleteSession(c.id).subscribe({
      next: (resp) => {
        this.sessions = this.sessions.pipe(
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
