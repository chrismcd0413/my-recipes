import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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

  login(email: string, password: string) {
    this.auth.signInWithEmailAndPassword(email, password)
    .catch((error) =>
      this.createAlert('Error', error.message)
    );
  }

  logout() {
    this.auth.signOut();
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
    this.fb.fetchUserProfile(user.uid).subscribe((profile) => {
      this.userService.setUser(profile);
      if (this.firstRun) {
        this.router.navigate(['/']);
        this.firstRun = false;
      }
    });
  }

  isAuth() {
    return this.isAuthenticated;
  }

  createAlert(_header: string, _message: string) {
    this.alertController.create({
      header: _header,
      message: _message
    }).then((x) => x.present());
  }
}
