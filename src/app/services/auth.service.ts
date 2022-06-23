import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private isAuthenticated = false;
  private subs: Subscription[] = [];
  private firstRun = true;
  constructor(
    private auth: AngularFireAuth,
    private userService: UserService,
    private router: Router,
    private alertController: AlertController,
    private fb: FirebaseService
  ) { }

  ngOnDestroy(): void {
      this.subs.forEach(x => x.unsubscribe());
  }

  login(email: string, password: string) {
    this.auth.signInWithEmailAndPassword(email, password)
    .catch((error) =>
      this.createAlert('Error', error.message)
    );
  }

  logout() {
    this.auth.signOut();
  }

  sendPasswordReset(email) {
    return this.auth.sendPasswordResetEmail(email);
  }

  initAuthListener() {
    this.subs.push(
      this.auth.authState.subscribe(user => {
        if (user) {
          this.isAuthenticated = true;
          this.setUserData(user);
        } else {
          this.userService.clearUser();
          this.router.navigate(['login']);
        }
      })
    );
  }

  setUserData(user) {
      this.userService.setUser(user);
      if (this.firstRun) {
        this.router.navigate(['/']);
        this.firstRun = false;
      }
  }

  isAuth() {
    return this.isAuthenticated;
  }

  createNewAccount(name: string, _email: string, password: string) {
    this.auth.createUserWithEmailAndPassword(_email, password)
    .then(user => user.user.updateProfile({ displayName: name }))
    .catch(error => this.createAlert('Error', error.message));
  }

  private createAlert(_header: string, _message: string) {
    this.alertController.create({
      header: _header,
      message: _message
    }).then((x) => x.present());
  }
}
