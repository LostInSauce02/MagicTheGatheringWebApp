import { Component, Inject } from '@angular/core';
import { GlobalComponent } from '../global/global.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog-component.component.html',
  styleUrls: ['./dialog-component.component.scss']
})
export class DialogComponentComponent {
  deckArray = GlobalComponent.decks;
  cardName: string ='';
  CID: string = '';
  clickedAdd: string = 'not clicked';
  constructor(public dialogRef: MatDialogRef<DialogComponentComponent>, @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.CID = data.row['CID'];
    this.cardName = data.row['cardName'];
  }

onNoClick() {
    this.dialogRef.close();
  }

onYesClick() {
    this.dialogRef.close();
  }

add(){
  this.clickedAdd='clicked';
}
quickSell(){
  const card = {
    "email": GlobalComponent.username,
    "CID": this.CID,
    
  };
  GlobalComponent.sell.push(card);
  
  this.dialogRef.close();
}

addToArray(){
  let deck = document.getElementsByName("selection") as NodeListOf <HTMLInputElement>;
  for (var i = 0; i < deck.length;i++)
  {
    if (deck[i].checked==true)
    {
      const card = {
        "email": GlobalComponent.username,
        "CID": this.CID,
        "DID": String(deck[i].value)
      };
      GlobalComponent.cards.push(card);

      //console.log(this.cards);
      break;
    }
  }
  this.dialogRef.close();
}
 
}
