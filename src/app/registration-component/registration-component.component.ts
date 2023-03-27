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
  
  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient)
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
    console.log(this.registrationForm.value["birthdate"]); // Need to change this from Date object to String
    this.http.post<any>("http://localhost:5191/registerUser", this.registrationForm.value)
    .subscribe(res => {
      if(res == true)
      {
        this.registrationForm.reset();
        this.router.navigate(["login"]);
      }
      else
      {
        alert("Error! User Already Exists");
      }
    })
  }
  

}
