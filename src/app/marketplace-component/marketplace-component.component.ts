import { Component, OnInit, Inject } from '@angular/core';
import { DialogComponentComponent } from '../dialog-component/dialog-component.component'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { GlobalComponent } from '../global/global.component';
@Component({
  selector: 'app-marketplace-component',
  templateUrl: './marketplace-component.component.html',
  styleUrls: ['./marketplace-component.component.scss']
})
export class MarketplaceComponentComponent {

  dataSource: any;
  displayedColumns: string[] = ['CID','name','formatcommander','type','colors','manacost','maintype','set','rarity','price'];
  constructor(private http: HttpClient, public dialog: MatDialog)
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
        alert("ERROR! No Cards For User");
      }
  }) 
  }

  rowClick(row: any)
  {
    alert(row["name"]);
    //this.openDialog(row);
  }

}
