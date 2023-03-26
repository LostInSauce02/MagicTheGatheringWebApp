import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponentComponent {

  public loginForm !: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router)
  {
    
  }

  ngOnInit(): void{
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.email],
      password: ["", Validators.required],
    })
  }

  login()
  {
    
    this.http.post<any>("http://localhost:5191/authenticateLogin", this.loginForm.value)
    .subscribe(res=>{
      if(res == true)
      {
        this.loginForm.reset();
        this.router.navigate(["home"]);
      }
      else
      {
        alert("Error! User Not Found");
      }
    })
  }

}
