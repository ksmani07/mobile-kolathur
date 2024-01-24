import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountPage } from './account.page';
import { SignupComponent } from '../signup/signup.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { AddressModelListComponent } from '../address-model-list/address-model-list.component';
import { AddressListComponent } from '../shared/components/address-component/address-list/address-list.component';
import { DefaultAccountComponent } from './default-account/default-account.component';
import { AddAddressComponent } from '../shared/components/address-component/add-address/add-address.component';

const routes: Routes = [
  {
    path: '',
    component: AccountPage,
    children:[
      {
        path:'',
        pathMatch:'full',
        component: DefaultAccountComponent
      },
      {
        path:'alist',
        component:AddressListComponent
      },
      {
        path:'add',
        component:AddAddressComponent
      }
    ]
  },{
    path:'signup',
    //canActivate:[AuthGuard],
    component:SignupComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountPageRoutingModule {}
