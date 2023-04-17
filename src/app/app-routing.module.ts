import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponentComponent } from './registration-component/registration-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { UserInventoryComponent } from './user-inventory/user-inventory.component';
import { DeckComponentComponent } from './deck-component/deck-component.component';
import { ProfileComponentComponent } from './profile-component/profile-component.component';
import { MarketplaceComponentComponent } from './marketplace-component/marketplace-component.component';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'register', component: RegistrationComponentComponent },
  { path: 'login', component: LoginComponentComponent },
  { path: 'home', component: HomeComponentComponent, children: [{path: 'user-inventory', component: UserInventoryComponent},{path: 'user-decks', component: DeckComponentComponent},{path: 'user-profile', component: ProfileComponentComponent},{path: 'marketplace', component: MarketplaceComponentComponent}]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
