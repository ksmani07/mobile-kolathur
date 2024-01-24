import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage.service';
import { Profile, ProfileService } from 'shopping-api';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss'],
})
export class AddressListComponent  implements OnInit {
  profile:Profile | any;
  constructor(private storageService:StorageService, private router:Router) { }

  ngOnInit() {
    this.storageService.get(environment.profile).then((userProfile)=>{
      console.log("p", userProfile);
      if(userProfile){
        this.profile = userProfile;
      }
    })
  }

  addAddress(){
    this.router.navigate(['account/add'])
  }

}
