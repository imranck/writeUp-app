import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userData: any;

  constructor(private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    public ngZone: NgZone) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  Signin(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password).then((result) => {
      this.SetUserData(result.user);
      this.afAuth.authState.subscribe((user) => {
        if (user) {
          this.router.navigate(['home']);
        }
      });
    })
      .catch((error) => {
        window.alert(error.message);
      });
  }



  Register(email: any, password: any) {
    this.afAuth.createUserWithEmailAndPassword(email, password).then((result) => {
      this.SetUserData(result.user);
      alert('Registration Successfull')
      this.router.navigate(['landingpage']);
    }).catch((error) => {
      window.alert(error.message);
    });
  }


  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['landingpage']);
    });
  }

}
