/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _userDetails = new BehaviorSubject<any>(null);
  constructor() { }
  get userDetails() {
    return this._userDetails.asObservable();
  }
  setUser(user) {
    this._userDetails.next(user);
  }
  clearUser() {
    this._userDetails.next(null);
  }
}
