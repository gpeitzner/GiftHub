import { Component, OnInit } from '@angular/core';
import { users } from '../../mocks/users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  alert: boolean;
  username: string;
  password: string;
  constructor() {}

  ngOnInit(): void {}

  /**
   * Login an user with username and password entered.
   */
  login(): void {
    if (this.username && this.password) {
      const filteredUser = users.filter((user) => {
        return (
          (user.username === this.username || user.email === this.username) &&
          user.password === this.password
        );
      });
      if (filteredUser.length === 1) {
        this.alert = false;
      } else {
        this.username = '';
        this.password = '';
        this.alert = true;
      }
    }
  }
}
