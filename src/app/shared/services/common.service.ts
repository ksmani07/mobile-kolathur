import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { AddressModelListComponent } from 'src/app/address-model-list/address-model-list.component';
import { SharedModule } from '../shared.module';
import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private addedCartItem = new BehaviorSubject<any>(true);
  public readonly getNewCart$:Observable<any> = this.addedCartItem.asObservable();
  constructor(private modalCtrl: ModalController,
    private router:Router, private storage:StorageService) { }


  setCartItem(added:any){
    this.addedCartItem.next(added);
  }

  async onOpenModel(event:any) {
    const modal = await this.modalCtrl.create({
      component: AddressModelListComponent,
      initialBreakpoint: 0.25,
      breakpoints: [0, 0.25, 0.5, 0.75]
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'signIn') {
      this.router.navigate(['account/signup']);
    }
    console.log('data', data)
    console.log('role', role)
  }

  isSignIn():Observable<any>{
    return of(this.storage.get(environment.signIn));
  }

  clearNotLoginData() {
    // Remove token
    this.storage.remove(environment.profile);
    this.storage.remove(environment.signIn);

    localStorage.removeItem("shoppingtoken");
    // Remove Profile
  }

}
