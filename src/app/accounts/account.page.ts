import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Profile, ProfileService } from 'shopping-api';

@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss']
})
export class AccountPage implements OnInit {
  profile:Observable<Profile>;
  constructor(private profileService:ProfileService,private router:Router, private modalCtrl: ModalController) {}
  ngOnInit(): void {
     
  }

 
}
