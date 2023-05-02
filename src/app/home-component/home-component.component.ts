import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalComponent } from '../global/global.component';
import { Router,ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.scss']
})
export class HomeComponentComponent {
  
  username: string = "";
  userBalance: any;

  constructor(private router: Router,private route: ActivatedRoute, private http: HttpClient){}
  ngOnInit(){
    if(GlobalComponent.LoginStatus == false)
    {
      this.router.navigate(['/login']);
    }
    else
    {
      this.username = GlobalComponent.username;
      const obj = {"email": GlobalComponent.username};
      this.http.post<any>("https://mtgbackend.azurewebsites.net/getUser", obj)
      .subscribe(res=>{
      this.userBalance=res[0]['user_balance'];
      GlobalComponent.timeSinceRandomCard=res[0]['time'];
    })
    }
  }

  logout()
  {
    GlobalComponent.LoginStatus = false;
    GlobalComponent.username = "";
    this.router.navigate(['/login']);
  }

  userProfile()
  {
    this.router.navigate(['user-profile'], {relativeTo:this.route});
  }
  userInventory()
  {
    this.router.navigate(['user-inventory'], {relativeTo:this.route});
  }
  userDecks()
  {
    this.router.navigate(['user-decks'], {relativeTo:this.route});
  }
  marketplace()
  {
    this.router.navigate(['marketplace'], {relativeTo:this.route});
  }
  
    
}
