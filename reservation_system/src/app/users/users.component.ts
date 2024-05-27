import { Component, OnInit } from '@angular/core';
import { catchError, map, Observable, throwError } from "rxjs";
import { User } from "../model/account.model";
import { FormBuilder, FormGroup } from "@angular/forms";
import { UsersService } from "../services/users.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users!: Observable<Array<User>>;
  errorMessage!: string;
  searchFormGroup: FormGroup | undefined;

  constructor(private usersService: UsersService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control("")
    });
    this.handleSearchUsers();
  }

  handleSearchUsers() {
    let kw = this.searchFormGroup?.value.keyword;
    this.users = this.usersService.SearchUser(kw).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }

  handleDeleteUser(c: User) {
    let conf = confirm("Are you sure?");
    if (!conf) return;
    this.usersService.deleteUser(c.id).subscribe({
      next: (resp) => {
        this.users = this.users.pipe(
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
