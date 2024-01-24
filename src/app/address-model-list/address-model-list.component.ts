import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../shared/services/storage.service';
import { Profile, Address } from 'shopping-api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-address-model-list',
  templateUrl: './address-model-list.component.html',
  styleUrls: ['./address-model-list.component.scss'],
})
export class AddressModelListComponent  implements OnInit {
  
  profile:Profile;

  constructor(private modalCtrl: ModalController, private storageServe:StorageService) { }

  ngOnInit() {
  console.log("address")
    this.storageServe.get(environment.profile).then(pr=>{
      this.profile = pr;
    })
  }
  signIn() {
    return this.modalCtrl.dismiss(null, 'signIn');
  }
  onOpenAddress(address:Address){
    console.log('address', address);
  }

}
