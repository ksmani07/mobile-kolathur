import { AfterViewInit, Component, OnDestroy, OnInit, Optional, ViewChild } from '@angular/core';
import { App } from '@capacitor/app';
import { IonRouterOutlet, IonTabs, Platform } from '@ionic/angular';
import { StorageService } from '../shared/services/storage.service';
import { environment } from 'src/environments/environment';
import { CommonService } from '../shared/services/common.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  providers:[CommonService, StorageService]
})
export class TabsPage implements OnInit , AfterViewInit, OnDestroy {
  @ViewChild('tabs') tabs: IonTabs;
  cartQuantity:number | null;
  unSubscription:Subscription;

  resetStackTabs = ['home', 'tab2', 'cart', 'tab4'];

  constructor(
    private platform: Platform, 
    @Optional() private routerOutlet: IonRouterOutlet,
    private storageSerive:StorageService,
    private commonService:CommonService,
    private router:Router) {}


ngOnInit(): void {
  this.platform.backButton.subscribeWithPriority(-1, () => {
    if (!this.routerOutlet.canGoBack()) {
      App.exitApp();
    }
  });

}



ngAfterViewInit(): void {}


ngOnDestroy(): void {
    this.unSubscription.unsubscribe();
}


}
