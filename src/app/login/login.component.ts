import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { validateConfig } from '@angular/router/src/config';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    emailAddress: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthService, private router: Router) { }

  signInWithEmail() {
    const _email = this.loginForm.value.emailAddress;
    const _pass = this.loginForm.value.password;
    this.authService.signInRegular(_email, _pass)
      .then((res) => {
        console.log(res);
        this.router.navigate(['home']);
      })
      .catch((err) => console.log('error: ' + err));
  }

  ngOnInit() {
  }

}
