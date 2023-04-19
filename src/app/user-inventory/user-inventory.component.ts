import { Component, OnInit, Inject } from '@angular/core';
import { DialogComponentComponent } from '../dialog-component/dialog-component.component'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { GlobalComponent } from '../global/global.component';
const USER_DATA = 
  [{"CID":"103","CardCount":1,"name":"Geist Trappers","formatcommander":"legal","type":"Creature — Human Warrior","colors":"G","manacost":"4G","maintype":"Creature","set":"AVR","rarity":"common","price":"10"},
  {"CID":"103","CardCount":1,"name":"Geist Trappers","formatcommander":"legal","type":"Creature — Human Warrior","colors":"G","manacost":"4G","maintype":"Creature","set":"AVR","rarity":"common","price":"10"},
  {"CID":"103","CardCount":1,"name":"Geist Trappers","formatcommander":"legal","type":"Creature — Human Warrior","colors":"G","manacost":"4G","maintype":"Creature","set":"AVR","rarity":"common","price":"10"},
  {"CID":"103","CardCount":1,"name":"Geist Trappers","formatcommander":"legal","type":"Creature — Human Warrior","colors":"G","manacost":"4G","maintype":"Creature","set":"AVR","rarity":"common","price":"10"},
  {"CID":"103","CardCount":1,"name":"Geist Trappers","formatcommander":"legal","type":"Creature — Human Warrior","colors":"G","manacost":"4G","maintype":"Creature","set":"AVR","rarity":"common","price":"10"},
  {"CID":"103","CardCount":1,"name":"Geist Trappers","formatcommander":"legal","type":"Creature — Human Warrior","colors":"G","manacost":"4G","maintype":"Creature","set":"AVR","rarity":"common","price":"10"},
  {"CID":"103","CardCount":1,"name":"Geist Trappers","formatcommander":"legal","type":"Creature — Human Warrior","colors":"G","manacost":"4G","maintype":"Creature","set":"AVR","rarity":"common","price":"10"},
  {"CID":"103","CardCount":1,"name":"Geist Trappers","formatcommander":"legal","type":"Creature — Human Warrior","colors":"G","manacost":"4G","maintype":"Creature","set":"AVR","rarity":"common","price":"10"},
  {"CID":"103","CardCount":1,"name":"Geist Trappers","formatcommander":"legal","type":"Creature — Human Warrior","colors":"G","manacost":"4G","maintype":"Creature","set":"AVR","rarity":"common","price":"10"},
  {"CID":"103","CardCount":1,"name":"Geist Trappers","formatcommander":"legal","type":"Creature — Human Warrior","colors":"G","manacost":"4G","maintype":"Creature","set":"AVR","rarity":"common","price":"10"},
  {"CID":"103","CardCount":1,"name":"Geist Trappers","formatcommander":"legal","type":"Creature — Human Warrior","colors":"G","manacost":"4G","maintype":"Creature","set":"AVR","rarity":"common","price":"10"},
  {"CID":"103","CardCount":1,"name":"Geist Trappers","formatcommander":"legal","type":"Creature — Human Warrior","colors":"G","manacost":"4G","maintype":"Creature","set":"AVR","rarity":"common","price":"10"},
  {"CID":"103","CardCount":1,"name":"Geist Trappers","formatcommander":"legal","type":"Creature — Human Warrior","colors":"G","manacost":"4G","maintype":"Creature","set":"AVR","rarity":"common","price":"10"},
  {"CID":"103","CardCount":1,"name":"Geist Trappers","formatcommander":"legal","type":"Creature — Human Warrior","colors":"G","manacost":"4G","maintype":"Creature","set":"AVR","rarity":"common","price":"10"},
  {"CID":"103","CardCount":1,"name":"Geist Trappers","formatcommander":"legal","type":"Creature — Human Warrior","colors":"G","manacost":"4G","maintype":"Creature","set":"AVR","rarity":"common","price":"10"},
  {"CID":"103","CardCount":1,"name":"Geist Trappers","formatcommander":"legal","type":"Creature — Human Warrior","colors":"G","manacost":"4G","maintype":"Creature","set":"AVR","rarity":"common","price":"10"},
  {"CID":"103","CardCount":1,"name":"Geist Trappers","formatcommander":"legal","type":"Creature — Human Warrior","colors":"G","manacost":"4G","maintype":"Creature","set":"AVR","rarity":"common","price":"10"},
  {"CID":"103","CardCount":1,"name":"Geist Trappers","formatcommander":"legal","type":"Creature — Human Warrior","colors":"G","manacost":"4G","maintype":"Creature","set":"AVR","rarity":"common","price":"10"},
  {"CID":"103","CardCount":1,"name":"Geist Trappers","formatcommander":"legal","type":"Creature — Human Warrior","colors":"G","manacost":"4G","maintype":"Creature","set":"AVR","rarity":"common","price":"10"},
  {"CID":"103","CardCount":1,"name":"Geist Trappers","formatcommander":"legal","type":"Creature — Human Warrior","colors":"G","manacost":"4G","maintype":"Creature","set":"AVR","rarity":"common","price":"10"},
  {"CID":"103","CardCount":1,"name":"Geist Trappers","formatcommander":"legal","type":"Creature — Human Warrior","colors":"G","manacost":"4G","maintype":"Creature","set":"AVR","rarity":"common","price":"10"},
  {"CID":"112","CardCount":1,"name":"Angel of Glory's Rise","formatcommander":"legal","type":"Creature — Angel","colors":"W","manacost":"5WW","maintype":"Creature","set":"AVR","rarity":"rare","price":"50"},
  {"CID":"113","CardCount":1,"name":"Ghoulflesh","formatcommander":"legal","type":"Enchantment — Aura","colors":"B","manacost":"B","maintype":"Enchantment","set":"AVR","rarity":"common","price":"10"},
  {"CID":"120","CardCount":1,"name":"Gisela, Blade of Goldnight","formatcommander":"legal","type":"Legendary Creature — Angel","colors":"WR","manacost":"4RWW","maintype":"Creature","set":"AVR","rarity":"mythic","price":"100"}];


@Component({
  selector: 'app-user-inventory',
  templateUrl: './user-inventory.component.html',
  styleUrls: ['./user-inventory.component.scss']
})
export class UserInventoryComponent {
  displayedColumns: string[] = ['CID','CardCount','name','formatcommander','type','colors','manacost','maintype','set','rarity','price'];
  dataSource: any;
  dialogRef: any;
  constructor(private http: HttpClient, public dialog: MatDialog)
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
        console.log(GlobalComponent.decks);
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
}
