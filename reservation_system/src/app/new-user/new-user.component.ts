import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../services/users.service";
import {User} from "../model/account.model";
import {Router} from "@angular/router";
enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  JURY = 'JURY'
}
@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit{
  public userForm!:FormGroup;
  public roles = Object.values(Role);

  constructor(private fb: FormBuilder, private userService:UsersService,private router:Router) {
  }
  ngOnInit() {
    this.userForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      role: this.fb.control(this.roles[1], [Validators.required])
    });
  }

  saveUser() {
    let user:User=this.userForm.value;
    this.userService.saveUser(user).subscribe({
      next : data=>{
        alert("user has been successfully saved!");
        //this.userForm.reset();
        //this.router.navigateByUrl("/users");
      },
      error : err => {
        console.log(err);
      }
    });
  }
}
