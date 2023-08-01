import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { homePage } from './home.page';
import { ListProductsComponent } from '../list-products/list-products.component';
import { HomeDefaultComponent } from './home-default/home-default.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';

const routes: Routes = [
  {
    path: '',
    component: homePage,
    children:[
      {
        path:'',
        pathMatch:'full',
        component:HomeDefaultComponent
      },
      {
        path:'category/:id',
        component: ListProductsComponent
      },
      {
        path:'product/:id',
        component: ProductDetailsComponent
      }
    ]
  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class homePageRoutingModule {}
