import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { environment } from 'src/environments/environment';
import { Profile, Address } from 'shopping-api';
@Component({
  selector: 'app-address-toolbar',
  templateUrl: './address-toolbar.component.html',
  styleUrls: ['./address-toolbar.component.scss'],
})
export class AddressToolbarComponent  implements OnInit, AfterViewInit {
  @Output() openModel = new EventEmitter();
  constructor(private storageService:StorageService) { }
  title = 'Select a location';
  address:Profile;
  ngOnInit() {}
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.storageService.get(environment.profile).then((profile)=>{
        console.log('profile',profile);
        if(profile?.addresses){
         this.title = profile?.addresses.find((a:Address)=>a.isDefault)?.address ?? profile?.addresses[0].address;
        }
      });
    }, 100);
    
  } 
  openModal(){
    this.openModel.emit();
  }
}
