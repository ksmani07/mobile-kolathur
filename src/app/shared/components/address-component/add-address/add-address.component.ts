import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address, AddressService, CreateAddressRequest, ProfileService } from 'shopping-api';
import { StorageService } from 'src/app/shared/services/storage.service';
import { environment } from 'src/environments/environment';

interface State {name:string,value:string};
@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss'],
})
export class AddAddressComponent  implements OnInit {

  addressForm:FormGroup;
  stateList:State[] = [
    {name:"AN",value:"Andaman and Nicobar Islands"},
    {name:"AP",value:"Andhra Pradesh"},
    {name:"AR",value:"Arunachal Pradesh"},
    {name:"AS",value:"Assam"},
    {name:"BR",value:"Bihar"},
    {name:"CG",value:"Chandigarh"},
    {name:"CH",value:"Chhattisgarh"},
    {name:"DN",value:"Dadra and Nagar Haveli"},
    {name:"DD",value:"Daman and Diu"},
    {name:"DL",value:"Delhi"},
    {name:"GA",value:"Goa"},
    {name:"GJ",value:"Gujarat"},
    {name:"HR",value:"Haryana"},
    {name:"HP",value:"Himachal Pradesh"},
    {name:"JK",value:"Jammu and Kashmir"},
    {name:"JH",value:"Jharkhand"},
    {name:"KA",value:"Karnataka"},
    {name:"KL",value:"Kerala"},
    {name:"LA",value:"Ladakh"},
    {name:"LD",value:"Lakshadweep"},
    {name:"MP",value:"Madhya Pradesh"},
    {name:"MH",value:"Maharashtra"},
    {name:"MN",value:"Manipur"},
    {name:"ML",value:"Meghalaya"},
    {name:"MZ",value:"Mizoram"},
    {name:"NL",value:"Nagaland"},
    {name:"OR",value:"Odisha"},
    {name:"PY",value:"Puducherry"},
    {name:"PB",value:"Punjab"},
    {name:"RJ",value:"Rajasthan"},
    {name:"SK",value:"Sikkim"},
    {name:"TN",value:"Tamil Nadu"},
    {name:"TS",value:"Telangana"},
    {name:"TR",value:"Tripura"},
    {name:"UP",value:"Uttar Pradesh"},
    {name:"UK",value:"Uttarakhand"},
    {name:"WB",value:"West Bengal"}
  ];
  defaultState:State = {name:"TN",value:"Tamil Nadu"};
  isAddressSubmit = false;
  constructor(private fb:FormBuilder, private addressService:AddressService, private profileService:ProfileService,private storageService:StorageService ) { }

  ngOnInit() {
    this.initializeForm();
  } 

  initializeForm(){
      this.addressForm = this.fb.group({
        name: ['', Validators.required],
        address: ['', Validators.required],
        street:['',  Validators.required],
        phoneNo:['',Validators.required],
        city:['',Validators.required],
        state:[this.defaultState,Validators.required],
        zipcode:['',Validators.required],
        isDefault:[false]
      });
  }

  get addressFormControl() {
    return this.addressForm.controls;
  }

  formSubmit() {
    this.isAddressSubmit = true;
    console.log('this.addressForm',this.addressForm)
    if(this.addressForm.invalid){
      return true;
    }
    console.log('form data',this.addressForm)

    const value:CreateAddressRequest | any = this.addressForm.value;
    value.state = this.addressForm.value.state.name;
    value.phoneNo = this.addressForm.value.phoneNo.toString();
    this.addressService.createAddress(value).subscribe((address:Address)=>{
      if(address){
        this.storageService.get(environment.profile).then((userProfile)=>{
          console.log("p", userProfile);
          if(userProfile?.addresses){
            userProfile.addresses.push(address);
          }else{

          }
        })
      }
    });
    return 
  }

  stateCompare(e1:State,e2:State){
    return e1 && e2 ? e1.name === e2.name : e1 === e2;
  }

}
