import { Component, OnInit, Inject, ViewContainerRef} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { GlobalComponent } from '../global/global.component';
import { DeckCardComponentComponent } from '../deck-card-component/deck-card-component.component';

@Component({
  selector: 'app-deck-component',
  templateUrl: './deck-component.component.html',
  styleUrls: ['./deck-component.component.scss']
})

export class DeckComponentComponent {
displayedColumns: string[] = ['DID'];
dataSource: any;
dialogRef: any;
didPairs: Map<number, number>;

  constructor(private http: HttpClient, public dialog: MatDialog, private view: ViewContainerRef)
  {
    const obj = {"email": GlobalComponent.username};
    this.didPairs = new Map<number, number>();

    this.http.post<any>("http://localhost:5191/getUserDeck", obj)
    .subscribe(res=>{
      if(res != null)
      {
        res = res.sort((a: { DID: number; }, b: { DID: number; }) => { 
          if (a.DID < b.DID) {
            return -1;
          }
          return 0;
        });

        let counter = 1;
        for(let value of res) {
          this.didPairs.set(counter++, value.DID);
        }
        
        counter = 1;
        this.dataSource = res.map((elem: { UID: number; DID: number; }) => ({
          'UID': elem.UID,
          'DID': counter++
        }));
      }
      else
      {
        alert("ERROR! No decks for the user.");
      }
    }) 
  }

  rowClick(row: any)
  {
    //alert(row["name"]);
    this.openDialog(row);
  }

  openDialog(row: any): void {
     this.dialogRef = this.dialog.open(DeckCardComponentComponent, {
      
      width: '75%',
      height: '85%',
      data: {row: row, didPairs: this.didPairs}
     }).afterClosed()
     .subscribe(() => this.refreshParent());
  }
  
  refreshParent() {
    const obj = {"email": GlobalComponent.username};

    this.http.post<any>("http://localhost:5191/getUserDeck", obj)
    .subscribe(res=>{
      if(res != null)
      {
        res = res.sort((a: { DID: number; }, b: { DID: number; }) => { 
          if (a.DID < b.DID) {
            return -1;
          }
          return 0;
        });

        let counter = 1;
        for(let value of res) {
          this.didPairs.set(counter++, value.DID);
        }
        
        counter = 1;
        this.dataSource = res.map((elem: { UID: number; DID: number; }) => ({
          'UID': elem.UID,
          'DID': counter++
        }));
      }
      else
      {
        alert("ERROR! No decks for the user.");
      }
    })
  }

  createDeck() {
    const obj = {"email": GlobalComponent.username};
    this.http.post<any>("http://localhost:5191/createUserDeck", obj)
    .subscribe(res=>{
      if(res != null)
      {
        this.refreshParent(); 
      }
      else
      {
        alert("ERROR! Deck was not created.");
      }
    }) 
  }
}
