import { Component } from '@angular/core';
import { GlobalComponent } from '../global/global.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.scss']
})
export class HomeComponentComponent {
  
  username: string ="";

  constructor(private router: Router){}
  ngOnInit(){
    if(GlobalComponent.LoginStatus == false)
    {
      this.router.navigate(['/login']);
    }
    else
    {
      console.log(GlobalComponent.username);
      this.username = GlobalComponent.username; // Need to understand why this line is not working
      let output1 = document.querySelector("#email");
      if(output1 != null)
      {
        output1.textContent = this.username;
      }
    }
  }

  logout()
  {
    GlobalComponent.LoginStatus = false;
    GlobalComponent.username = "";
    this.router.navigate(['/login']);
  }
    
}
