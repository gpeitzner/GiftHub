import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioI } from 'src/app/interfaces/usuario.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  alert: boolean;
  username: string;
  password: string;
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {}

  /**
   * Login an user with username and password entered.
   */
  login(): void {
    if (this.username && this.password) {
      this.userService.loginByEmail(this.username, this.password).subscribe(
        (emailResults: UsuarioI[]) => {
          if (emailResults.length === 0) {
            this.userService
              .loginByUser(this.username, this.password)
              .subscribe(
                (usernameResults: UsuarioI[]) => {
                  if (usernameResults.length === 0) {
                    this.showLoginError();
                  } else {
                    this.userService.user = usernameResults[0];
                    this.alert = false;
                    localStorage.setItem('username',this.username);
                    this.router.navigateByUrl('/Catalogo');
                  }
                },
                () => this.showLoginError()
              );
          } else {
            this.userService.user = emailResults[0];
            this.alert = false;
            this.router.navigateByUrl('/Catalogo');
          }
        },
        () => this.showLoginError()
      );
    }
  }

  /**
   * Show login error message
   */
  showLoginError(): void {
    this.username = '';
    this.password = '';
    this.alert = true;
  }
}
