import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/shared/services/common.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.scss'],
})
export class TabBarComponent  implements OnInit , OnDestroy{
  cartQuantity:number | null;
  unSubscription:Subscription;
  constructor(private storageSerive:StorageService,
    private commonService:CommonService,private zone:NgZone) {


     }

  ngOnInit() {
    this.zone.run(()=>{
      setTimeout(() => {
        this.lodaCartItem();
      }, 300);
    })  
  }
  ionViewWillEnter(){
    // setTimeout(() => {
    //   this.lodaCartItem();
    // }, 300);
  }
  ionViewDidEnter(){
 
  }

  lodaCartItem(){
    console.log('tab on init')
    this.unSubscription = this.commonService.getNewCart$.subscribe({
      next: (val)=>{
        console.log('getCartItem val', val)
        if(val){
          this.setCartQuantity(); 
        }
      },
      complete: () => console.log('Complete')
    }
    )
  }

  setCartQuantity(){
    console.log(environment.localCart)
    this.storageSerive.get(environment.localCart)?.then((val:any)=>{
      if(val){
        this.cartQuantity = val.map((a
          :any) => a.quantity).reduce(function(a:number, b:number)
        {
          return a + b;
        });
      }else{
        this.cartQuantity = null;
      }
    })
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy=========tab bar')
    this.unSubscription.unsubscribe();
  }
}
