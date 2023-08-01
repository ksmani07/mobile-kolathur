import { Component, OnDestroy, OnInit} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddressModelListComponent } from '../address-model-list/address-model-list.component';
import { NavigationEnd, Router } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { Subscriber, Subscription, filter } from 'rxjs';
import { Location } from '@angular/common';
import { CommonService } from '../shared/services/common.service';
register();
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class homePage implements OnInit, OnDestroy {
  isEnableBack = false;
  unSubscription:Subscription;
  constructor(private modalCtrl: ModalController,
     private router: Router,
     private location:Location,
     private commonService:CommonService) { }
  ngOnInit(): void {
   
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event:any) => {
      console.log(event);
      this.isEnableBack = true;
      if(event.url =='/home' || event.url =='/' || event.urlAfterRedirects=='/home'){
        this.isEnableBack = false;
      }
    });

  }

  
  ionViewDidLeave() {
    this.unSubscription?.unsubscribe();
    console.log('==========Home=====ionViewDidLeave==============')
  }


  onSetlocation() {
    console.log("set location")
  }

  onBack(){
    this.location.back();
  }


  async onOpenModel(event:any) {
    this.commonService.onOpenModel(event).then((val)=>{
      console.log('modelddd close', val);
    });
    // const modal = await this.modalCtrl.create({
    //   component: AddressModelListComponent,
    //   initialBreakpoint: 0.25,
    //   breakpoints: [0, 0.25, 0.5, 0.75]
    // });
    // modal.present();

    // const { data, role } = await modal.onWillDismiss();

    // if (role === 'signIn') {
    //   this.router.navigate(['signup']);
    // }
    // console.log('data', data)
    // console.log('role', role)
  }
  ngOnDestroy(): void {
      this.unSubscription.unsubscribe();
  }
}

