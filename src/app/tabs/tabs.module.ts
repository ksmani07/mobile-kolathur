import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { SharedModule } from '../shared/shared.module';
import { TabBarComponent } from './tab-bar/tab-bar.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    SharedModule,
    FormsModule,
    TabsPageRoutingModule,
  ],
  declarations: [TabsPage, TabBarComponent],
  exports:[SharedModule, TabBarComponent],
})
export class TabsPageModule {}
