import { Component } from '@angular/core';

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.scss']
})
export class GlobalComponent {
  public static LoginStatus: boolean = false;
  public static username: string = "";
  public static decks = new Array();
  public static cards = new Array();
  public static sell = new Array();
}
