import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-component',
  templateUrl: './registration-component.component.html',
  styleUrls: ['./registration-component.component.scss']
})
export class RegistrationComponentComponent {

  public registrationForm !: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private router: Router)
  {
    
  }

  ngOnInit(): void{
    this.registrationForm = this.formBuilder.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      email: ["", Validators.email],
      password: ["", Validators.required],
      birthdate: ["", Validators.required]
    })
  }

  register()
  {
    alert("Button Clicked");
  }
  

}
