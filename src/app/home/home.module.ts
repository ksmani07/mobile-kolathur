import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { homePage } from './home.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { homePageRoutingModule } from './home-routing.module';
import { AddressModelListComponent } from '../address-model-list/address-model-list.component';
import { CategoriesComponent } from '../categories/categories.component';
import { ListProductsComponent } from '../list-products/list-products.component';
import { HomeDefaultComponent } from './home-default/home-default.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [   
    CommonModule,
    SharedModule,
    ExploreContainerComponentModule,    
    homePageRoutingModule
  ],
  declarations: [
    homePage,
    AddressModelListComponent,
    HomeDefaultComponent,
    CategoriesComponent,
    ListProductsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class homePageModule {}
