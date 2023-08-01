import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from './services/common.service';
import { StorageService } from './services/storage.service';
import { AddressToolbarComponent } from './components/address-toolbar/address-toolbar.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TabBarComponent } from '../tabs/tab-bar/tab-bar.component';



@NgModule({
  declarations: [AddressToolbarComponent,TabBarComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],  
  exports:[
    FormsModule,
    IonicModule,
    AddressToolbarComponent,
    TabBarComponent
    ],
  providers:[CommonService, StorageService]
})
export class SharedModule { }
