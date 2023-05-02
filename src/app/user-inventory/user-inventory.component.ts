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
  clickedRowIndex: any;
  data: any = [];
  
  constructor(private http: HttpClient, public dialog: MatDialog, private view: ViewContainerRef)
  {
    const obj = {"email": GlobalComponent.username};
    this.http.post<any>("https://mtgbackend.azurewebsites.net/getUserInventory", obj)
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

  this.http.post<any>("https://mtgbackend.azurewebsites.net/getUserDeck", obj)
  .subscribe(res=>{
    if(res != null)
      {
        GlobalComponent.decks = res;
      }
  })
  }
 
  

  rowClick(row: any, i: number)
  {
    this.clickedRowIndex=i;
    this.openDialog(row);
  }

  openDialog(row: any): void {
     this.dialogRef = this.dialog.open(DialogComponentComponent, {
      
      width: '500px',
      height: '750px',
      data: {row}
     });
     /*this.dialogRef.afterClosed().subscribe((result: any)=>
      {
        if (result==0)
        {
          this.deleteRow(row);
        }
        else
        {
          this.updateRow(row,result);
        }
      })*/
  }
  deleteRow(row: any,index: any){
    this.dataSource.splice(index,1);
    this.dataSource=[...this.dataSource];
  }

  updateRow(row: any,index: any){
    if (row['CardCount']==1)
    {
      this.deleteRow(row,index);
    }
    else
    {
      row['CardCount']-=1;
    }
  }

  addCard(row: any)
  {
    for (var card of this.dataSource)
    {
      if (card['CID']==row['CID'])
      {
        card['CardCount']+=1;
        return;
      }
    }
    this.dataSource.unshift(row);
    this.dataSource=[...this.dataSource];
  }



  finalizeDeck(){
    if (GlobalComponent.cards.length==0)
    {
      alert("No Cards To Add.");
    }
    else
    {
      this.http.post<any>("https://mtgbackend.azurewebsites.net/addCardsToUserDeck", GlobalComponent.cards)
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
      
      this.http.post<any>("https://mtgbackend.azurewebsites.net/quickSellCard", GlobalComponent.sell)
      .subscribe(res=>{
        if(res != 0)
        {
          for (var card of GlobalComponent.sell)
          {
            let index = this.dataSource.findIndex((x: any)=>x.CID===card.CID);
            let row = this.dataSource[index];
            this.updateRow(row,index);
          }
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
  getRandomCard(){
    let CurrentTime = Date.now();
    let temp1 = String(CurrentTime).substring(0,String(CurrentTime).length-3);
    CurrentTime=Number(temp1);
    if (GlobalComponent.timeSinceRandomCard=="                                   " || (CurrentTime-Number(GlobalComponent.timeSinceRandomCard)>=60))
    { 
      const obj = {"email": GlobalComponent.username, "time": String(CurrentTime)};
      this.http.post<any>("https://mtgbackend.azurewebsites.net/getRandomCard",obj)
      .subscribe(res=>{
        if(res!=null)
        {
          this.addCard(res[0]);
        }
        else
        { 
          alert("Failed To Get Card");
        }
      })
      GlobalComponent.timeSinceRandomCard=String(CurrentTime);
    }
    else
    {
      alert("Cannot Get Random Card.");
    }
    
  }
}
