import { Component, OnInit } from '@angular/core';
import { users } from '../../mocks/users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  alert: boolean;
  constructor() {}

  ngOnInit(): void {}
}
