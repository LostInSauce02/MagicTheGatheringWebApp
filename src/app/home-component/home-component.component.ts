import { Component } from '@angular/core';
import { GlobalComponent } from '../global/global.component';
import { Router,ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.scss']
})
export class HomeComponentComponent {
  
  username: string = "";

  constructor(private router: Router,private route: ActivatedRoute){}
  ngOnInit(){
    if(GlobalComponent.LoginStatus == false)
    {
      this.router.navigate(['/login']);
    }
    else
    {
      this.username = GlobalComponent.username;
    }
  }

  logout()
  {
    GlobalComponent.LoginStatus = false;
    GlobalComponent.username = "";
    this.router.navigate(['/login']);
  }

  userInventory()
  {
    this.router.navigate(['user-inventory'], {relativeTo:this.route});
  }
    
}
