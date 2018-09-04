import { Component, OnInit } from '@angular/core';
import { LoginFormComponent } from '../components/login-form.component';
import { Creds } from '../models/User';
import { Store, select } from '@ngrx/store';
import * as fromAuth from '../reducers/';
import { LoginPageActions } from '../actions';

@Component({
  selector: 'app-login-page',
  template: `
  <div class="content-container">
  <div class="content-area">
      <div class="row">
          <div class="col-lg-5 col-md-8 col-sm-12 col-xs-12">
              <div class="card">
                  <div class="card-header">
                      Welcome
                  </div>
                  <app-login-form
                    (submitted)="onSubmit($event)"
                    [pending]="pending$ | async"
                    [error]="error$ | async"
                  ></app-login-form>
              </div>
          </div>
      </div>
  </div>
</div>
  `,
  styles: []
})
export class LoginPageComponent implements OnInit {
  pending$ = this.store.pipe(select(fromAuth.getLoginPagePending));
  error$ = this.store.pipe(select(fromAuth.getLoginPageError));

  constructor(private store: Store<fromAuth.State>) {}

  ngOnInit() {}

  onSubmit(credentials: Creds) {
    this.store.dispatch(new LoginPageActions.Login({ credentials }));
  }
}
