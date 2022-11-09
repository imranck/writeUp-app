import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore,AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userData:any;

  constructor(private toast:HotToastService,private afs:AngularFirestore,private fireauth: AngularFireAuth, private router: Router,public ngZone:NgZone) { }

  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('token', 'true');
      this.router.navigate(['home']);
      this.toast.observe({
            success: 'logged in successfully',
            loading: 'logging in',
            error: 'there was an error'
          })
      
     
    }, err => {
      // alert('something went wrong');
      this.router.navigate(['landingpage'])
    })
  }

  register(email:any,password:any) {
    
    this.fireauth.createUserWithEmailAndPassword(email,password).then((result) => {      
      // this.SetUserData(result.user);
      alert('Registration Successfull')
      this.router.navigate(['landingpage']);
    }, err => {
      alert(err.message);
      this.router.navigate(['landingpage']);
    })


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

}
