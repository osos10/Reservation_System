import { Component } from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";
import {JuryMember, User} from "../model/account.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UsersService} from "../services/users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-jury',
  templateUrl: './jury.component.html',
  styleUrl: './jury.component.css'
})
export class JuryComponent {
  jurymembers!: Observable<Array<JuryMember>>;
  errorMessage!: string;
  searchFormGroup: FormGroup | undefined;

  constructor(private usersService: UsersService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control("")
    });
    this.handleSearchJuryMembers();
  }

  handleSearchJuryMembers() {
    let kw = this.searchFormGroup?.value.keyword;
    this.jurymembers = this.usersService.SearchJuryMember(kw).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }

  handleDeleteJuryMember(c: JuryMember) {
    let conf = confirm("Are you sure?");
    if (!conf) return;
    this.usersService.deleteUser(c.user.id).subscribe({
      next: (resp) => {
        this.jurymembers = this.jurymembers.pipe(
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
