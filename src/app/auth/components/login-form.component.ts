import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Creds } from '../models/User';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent implements OnInit {
  @Input()
  set pending(isPending: boolean) {
    isPending ? this.loginForm.disable() : this.loginForm.enable();
  }

  @Input()
  error: string | null;

  @Output()
  submitted = new EventEmitter<Creds>();

  loginForm = new FormGroup({
    emailAddress: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor() {}

  ngOnInit() {}

  submit() {
    if (this.loginForm.valid) {
      this.submitted.emit(this.loginForm.value);
    }
  }
}
