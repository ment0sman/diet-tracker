import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { User, auth } from 'firebase/app';
import { Observable, from } from 'rxjs';
import { Creds } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: Observable<User>;
  private userDetails: User = null;

  constructor(private _firebaseAuth: AngularFireAuth) {
    this.user = _firebaseAuth.authState;

    this.user.subscribe(user => {
      if (user) {
        this.userDetails = user;
        console.log(this.userDetails);
      } else {
        this.userDetails = null;
      }
    });
  }

  signInRegular({
    emailAddress,
    password
  }: Creds): Observable<auth.UserCredential> {
    const credential = auth.EmailAuthProvider.credential(
      emailAddress,
      password
    );

    return from(
      this._firebaseAuth.auth.signInWithEmailAndPassword(emailAddress, password)
    );
  }

  get isLoggedIn(): boolean {
    return this.userDetails != null ? true : false;
  }

  currentUser(): Observable<User> {
    return this._firebaseAuth.authState;
  }

  // Returns current user UID
  get currentUserEmail(): string {
    return this.userDetails != null ? this.userDetails.email : '';
  }

  logout() {
    this._firebaseAuth.auth.signOut().then();
  }
}
