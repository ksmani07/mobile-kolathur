import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-address-model-list',
  templateUrl: './address-model-list.component.html',
  styleUrls: ['./address-model-list.component.scss'],
})
export class AddressModelListComponent  implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}
  signIn() {
    return this.modalCtrl.dismiss(null, 'signIn');
  }

}
