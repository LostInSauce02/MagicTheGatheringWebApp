import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { DialogComponentComponent } from '../dialog-component/dialog-component.component'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { GlobalComponent } from '../global/global.component';
import { HomeComponentComponent } from '../home-component/home-component.component';
@Component({
  selector: 'app-marketplace-component',
  templateUrl: './marketplace-component.component.html',
  styleUrls: ['./marketplace-component.component.scss']
})
export class MarketplaceComponentComponent {

  dataSource: any;
  displayedColumns: string[] = ['CID','name','formatcommander','type','colors','manacost','maintype','set','rarity','price'];
  constructor(private http: HttpClient, public dialog: MatDialog, private view: ViewContainerRef)
  {
    const obj = {"email": GlobalComponent.username};
    this.http.get<any>("http://localhost:5191/getCards")
    .subscribe(res=>{
      if(res != null)
      {
        this.dataSource = res;
      }
      else
      {
        alert("ERROR! No Cards");
      }
  }) 
  }

  rowClick(row: any)
  {
    var choice = prompt("Do you want to buy? (Y/N)")?.toString();
    console.log(typeof(choice));
    if(choice == "Y")
    {
      console.log("HERE");
      const card = {
        "email": GlobalComponent.username,
        "CID": row['CID']
      };
      GlobalComponent.buy.push(card);
    }
  }

  buyCards()
  {
    if(GlobalComponent.buy.length == 0)
    {
      alert("No Cards To Buy.");
    }
    else
    {
      this.http.post<any>("http://localhost:5191/buyCards", GlobalComponent.buy)
      .subscribe(res=>{
        if(res != 0)
        {
          alert("Cards Successfully Bought.")
          GlobalComponent.buy=[];
          const injector = this.view.parentInjector;
          const parent: HomeComponentComponent = injector.get<HomeComponentComponent>(HomeComponentComponent);
          parent.userBalance = res;
        }
        else
        { 
          alert("Error! Cards Cannot Be Sold.");
        }
      })
    }
  }

}
