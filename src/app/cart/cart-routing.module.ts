import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPage } from './cart.page';
import { CartDetailComponent } from '../cart-detail/cart-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CartPage,
    children:[
      {
        path:'',
        pathMatch:'full',
        component: CartDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartPageRoutingModule {}
