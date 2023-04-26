import { HttpClient } from '@angular/common/http';
import { GlobalComponent } from '../global/global.component';
import { Component, Inject, isStandalone } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-deck-card-component',
  templateUrl: './deck-card-component.component.html',
  styleUrls: ['./deck-card-component.component.scss'],
})

export class DeckCardComponentComponent {
  displayedColumns: string[] = ['DID', 'CID', 'CardCount'];
  dataSource: any;
  DID: string = '';
  didPairs: Map<number, number>;

  constructor(private http: HttpClient, public dialogRef: MatDialogRef<DeckCardComponentComponent>, @Inject(MAT_DIALOG_DATA) public data: any)
  {
    this.DID = data.row["DID"];
    this.didPairs = data.didPairs;
    const obj = {"email": GlobalComponent.username, "DID": this.DID.toString()};
    this.http.post<any>("http://localhost:5191/getCardsInUserDeck", obj)
    .subscribe(res=>{
      if(res != null)
      {
        this.dataSource = res;

      }
    })
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

  rowClick(row: any, i: any)
  {
    let amountToRemove = prompt("How many cards of this CID would you like to remove?");
    let tempNum = 0;
    if (amountToRemove != null) {
      tempNum = parseInt(amountToRemove);
    } else {
      amountToRemove = "0";
    }

    if(isNaN(tempNum) || (tempNum < 0) || (tempNum > row["CardCount"])) {
      amountToRemove = "0";
    }

    if(amountToRemove != "0") {
      let removeObj = new Array();
      for(let i = 0; i < parseInt(amountToRemove); i++) {
        removeObj.push({"email": GlobalComponent.username,"cid": row["CID"].toString(), "did": this.didPairs.get(row["DID"])?.toString()});
        this.updateRow(row, i);
      }
      

      this.http.post<any>("http://localhost:5191/removeCardsFromUserDeck", removeObj)
      .subscribe(res=>{
        if(res)
        {
          
        }
      })
    }
  }

  deleteDeck() {
    let deleteCheck = prompt("Are you sure you want to delete this deck? (y/n)");
    if (deleteCheck == "Y" || deleteCheck == "y") {
      const deleteObj = { "email": GlobalComponent.username, "did": this.didPairs.get(parseInt(this.DID))?.toString() };
      this.http.post<any>("http://localhost:5191/removeUserDeck", deleteObj)
      .subscribe(res=>{
          if(!res) {
            alert("Did not work.")
          }
        });
    }
    this.dialogRef.close();
  }
}
