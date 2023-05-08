import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponentComponent } from './registration-component/registration-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { MyMaterialModule } from './material.module';
import { HomeComponentComponent } from './home-component/home-component.component';
import { HttpClientModule } from '@angular/common/http';
import { GlobalComponent } from './global/global.component';
import { UserInventoryComponent } from './user-inventory/user-inventory.component';
import { DatePipe } from '@angular/common';
import { DeckComponentComponent } from './deck-component/deck-component.component';
import { MarketplaceComponentComponent } from './marketplace-component/marketplace-component.component';
import { DialogComponentComponent } from './dialog-component/dialog-component.component';
import { DeckCardComponentComponent } from './deck-card-component/deck-card-component.component';



@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponentComponent,
    LoginComponentComponent,
    HomeComponentComponent,
    GlobalComponent,
    UserInventoryComponent,
    DeckComponentComponent,
    MarketplaceComponentComponent,
    DialogComponentComponent,
    DeckCardComponentComponent,


    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MyMaterialModule,
    HttpClientModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
