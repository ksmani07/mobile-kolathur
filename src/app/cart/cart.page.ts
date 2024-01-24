import { Location } from '@angular/common';
import { AfterContentInit, AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Category, Product, ProductType } from 'shopping-api';
import { CommonService } from '../shared/services/common.service';
import { StorageService } from '../shared/services/storage.service';
import { environment } from 'src/environments/environment';
import { CartItem } from '../product-details/product-details.component';

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.page.html',
  styleUrls: ['cart.page.scss'],
})
export class CartPage  {
 constructor(private commonService:CommonService){}
 setVal(){
  this.commonService.setCartItem("test");
 }
}
