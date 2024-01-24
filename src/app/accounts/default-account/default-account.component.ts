import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Profile, ProfileService } from 'shopping-api';
@Component({
  selector: 'app-default-account',
  templateUrl: './default-account.component.html',
  styleUrls: ['./default-account.component.scss'],
})
export class DefaultAccountComponent  implements OnInit {

  profile:Observable<Profile>;
  constructor(private profileService:ProfileService,private router:Router) {}
  ngOnInit(): void {
      this.loadProfile();
  }
  loadProfile(){
    this.profile = this.profileService.getProfile();
   }
   signIn(){
     this.router.navigate(['account/signup']);
   }
 
   openAddress(){
     this.router.navigate(['account/alist']);
   }

}
