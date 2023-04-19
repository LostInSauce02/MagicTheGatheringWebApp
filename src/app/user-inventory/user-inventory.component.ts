import { Component, OnInit, Inject, ViewContainerRef} from '@angular/core';
import { DialogComponentComponent } from '../dialog-component/dialog-component.component'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { GlobalComponent } from '../global/global.component';
import { HomeComponentComponent } from '../home-component/home-component.component';



@Component({
  selector: 'app-user-inventory',
  templateUrl: './user-inventory.component.html',
  styleUrls: ['./user-inventory.component.scss']
})
export class UserInventoryComponent {
  displayedColumns: string[] = ['CID','CardCount','name','formatcommander','type','colors','manacost','maintype','set','rarity','price'];
  dataSource: any;
  dialogRef: any;
  
  constructor(private http: HttpClient, public dialog: MatDialog, private view: ViewContainerRef)
  {
    const obj = {"email": GlobalComponent.username};
    this.http.post<any>("http://localhost:5191/getUserInventory", obj)
    .subscribe(res=>{
      if(res != null)
      {
        this.dataSource = res;
      }
      else
      {
        alert("ERROR! No Cards For User");
      }
  }) 

  this.http.post<any>("http://localhost:5191/getUserDeck", obj)
  .subscribe(res=>{
    if(res != null)
      {
        GlobalComponent.decks = res;
      }
  })
  }
 
  rowClick(row: any)
  {
    //alert(row["name"]);
    this.openDialog(row);
  }

  openDialog(row: any): void {
     this.dialogRef = this.dialog.open(DialogComponentComponent, {
      
      width: '500px',
      height: '750px',
      data: {row}
     });
  }
  finalizeDeck(){
    if (GlobalComponent.cards.length==0)
    {
      alert("No Cards To Add.");
    }
    else
    {
      this.http.post<any>("http://localhost:5191/addCardsToUserDeck", GlobalComponent.cards)
    .subscribe(res=>{
      if(res == true)
      {
        alert("Cards Successfully Added To Deck(s).")
        GlobalComponent.cards=[];
      }
      else
      { 
        alert("Error! Cards Cannot Be Added.");
      }
    })
    }

    
  }
  
  finalizeSell(){
    if (GlobalComponent.sell.length==0)
    {
      alert("No Cards To Sell.");
    }
    else
    {
      this.http.post<any>("http://localhost:5191/quickSellCard", GlobalComponent.sell)
      .subscribe(res=>{
        if(res != 0)
        {
          alert("Cards Successfully Sold.")
          GlobalComponent.sell=[];
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
