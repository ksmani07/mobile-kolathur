import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressToolbarComponent } from './components/address-toolbar/address-toolbar.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabBarComponent } from '../tabs/tab-bar/tab-bar.component';
import { AddressListComponent } from './components/address-component/address-list/address-list.component';
import { AddAddressComponent } from './components/address-component/add-address/add-address.component';



@NgModule({
  declarations: [AddressToolbarComponent,AddressListComponent, AddAddressComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],  
  exports:[
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddressToolbarComponent,
    AddressListComponent,
    AddAddressComponent
    ],
  providers:[]
})
export class SharedModule { }
