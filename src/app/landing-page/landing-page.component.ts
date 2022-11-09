import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// import { Auth } from '@angular/fire/auth';
// import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { DetailserviceService } from '../services/detailservice.service';
import { HotToastService } from '@ngneat/hot-toast';
import { pipe } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],

})
export class LandingPageComponent implements OnInit {
  loginForm!: FormGroup;
  reactiveForm!: FormGroup;
  data:any=[];
  constructor(private db:AngularFireDatabase,private toast: HotToastService, private router: Router, public authService: AuthenticationService,  public detailservice: DetailserviceService, private http: HttpClient) { }

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required,Validators.email]),
      password: new FormControl(null, Validators.required),
      dateofbirth: new FormControl(null, Validators.required),
      country: new FormControl('india', Validators.required),
      gender: new FormControl('male', Validators.required)
    })

    this.loginForm = new FormGroup({
      email: new FormControl(null,[ Validators.required,Validators.email]),
      password: new FormControl(null, Validators.required),
    })

  }


  login(){
    // const { email, password } = this.loginForm.value
    // this.authService.login(email, password)
    // .pipe(
    //   this.toast.observe({
    //     success: 'logged in successfully',
    //     loading: 'logging in',
    //     error: 'there was an error'
    //   }))

    // .subscribe(() => {
    //   this.router.navigate(['/home']);
    // })


  // }

  if(this.loginForm.value.email == ''){
    alert('please enter email')
    return;
  }
  if(this.loginForm.value.password==''){
    alert('please enter password')
    return;
  }

  this.authService.login(this.loginForm.value.email,this.loginForm.value.password)

this.loginForm.reset()
  
  }

  signin(){
    this.detailservice.createAccount(this.reactiveForm.value)

this.reactiveForm.reset();

  }


}
