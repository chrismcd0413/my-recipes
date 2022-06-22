import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private fb: AngularFirestore,
    private userService: UserService
  ) { }
  fetchUserProfile(id: string) {
    return this.fb.collection('Users').doc(id).valueChanges({ idField: 'id' });
  }
}
