import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartPage } from './cart.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { CartPageRoutingModule } from './cart-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CartDetailComponent } from '../cart-detail/cart-detail.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ExploreContainerComponentModule,
    CartPageRoutingModule
  ],
  declarations: [CartPage,CartDetailComponent],
  exports:[
    SharedModule
  ]
})
export class CartPageModule {}
