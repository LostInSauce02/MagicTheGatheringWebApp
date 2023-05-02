import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-registration-component',
  templateUrl: './registration-component.component.html',
  styleUrls: ['./registration-component.component.scss']
})
export class RegistrationComponentComponent {

  public registrationForm !: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private datepipe: DatePipe)
  {
    
  }

  ngOnInit(): void{
    this.registrationForm = this.formBuilder.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      email: ["", Validators.email],
      password: ["", Validators.required],
      birthdate: ["", Validators.required],
      creation_date: [""]
    })
  }

  register()
  {
    var date = new Date();
    this.registrationForm.value["creation_date"] = this.datepipe.transform(date, 'yyyy-MM-dd');
    this.registrationForm.value["birthdate"] = this.datepipe.transform(this.registrationForm.value["birthdate"], 'yyyy-MM-dd');
    this.http.post<any>("https://mtgbackend.azurewebsites.net/registerUser", this.registrationForm.value)
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
