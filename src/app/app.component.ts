import { Component, OnInit } from '@angular/core';
import { LoadingController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  constructor(
    private platform: Platform,
    private loadingCtrl: LoadingController) {}

ngOnInit(): void {
 this.showLoading();
}

async showLoading() {
  const loading = await this.loadingCtrl.create({
    message: 'Locading...',
    duration: 3000,
  });

  loading.present();
}
 
}
