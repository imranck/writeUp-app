import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  reactiveForm!: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.reactiveForm=new FormGroup({
      firstname:new FormControl(null),
      lastname:new FormControl(null),
      username:new FormControl(null),
      dateofbirth:new FormControl(null),
      country:new FormControl(null),
      gender:new FormControl(null)
    })
  }

}
