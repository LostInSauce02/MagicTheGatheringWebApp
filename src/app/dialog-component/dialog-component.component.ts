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
  cardName: string = '';
  clickedAdd: string = 'not clicked';
  constructor(public dialogRef: MatDialogRef<DialogComponentComponent>, @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.cardName=data.row['name'];
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
  
}
 
}
