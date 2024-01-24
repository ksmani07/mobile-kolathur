import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountPage } from './account.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { AccountPageRoutingModule } from './account-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DefaultAccountComponent } from './default-account/default-account.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedModule,
    ExploreContainerComponentModule,
    AccountPageRoutingModule
  ],
  declarations: [AccountPage, DefaultAccountComponent]
})
export class AccountPageModule {}
