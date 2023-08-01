import { Location } from '@angular/common';
import { AfterContentInit, AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Category, Product, ProductType } from 'shoping-api';
import { CommonService } from '../shared/services/common.service';
import { StorageService } from '../shared/services/storage.service';
import { environment } from 'src/environments/environment';
import { CartItem } from '../product-details/product-details.component';

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.page.html',
  styleUrls: ['cart.page.scss'],
  providers: [CommonService]
})
export class CartPage implements OnInit, AfterViewInit {
  condition: number = 0;
  list: any[] = new Array(5);
  subTotal = 0;
  carItems: CartItem[] = [];

  category: Category = {
    name: "category5",
    description: "<p><strong>category5</strong> description</p><p>letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometime</p>",
    thumbnail: "d1920966-311d-4ea9-9fe7-2796da74abf9_test-1.jpeg",
    id: 4
  }
  productTypes: ProductType[] = [];
  constructor(
    private location: Location,
    private router: Router,
    private commonService: CommonService,
    private storageService: StorageService) {  
      console.log('==========CartPage=====constructor==============')
    }

  ngOnInit() {}
  ngAfterViewInit(): void {}

  ionViewDidLeave() {    
    console.log('==========cart=====ionViewDidLeave==============')
  }

  ionViewWillEnter(){
    setTimeout(() => {
      this.lodaCartItem();
    }, 300);
  }

  lodaCartItem() {
    this.storageService.get(environment.localCart).then((cartItem) => {
      console.log('cartItem', cartItem);
      this.carItems = cartItem ?? [];
      this.calculateSubTotal();
    })
  }

  onBack() {
    this.location.back();
  }

  async onOpenModel(event: any) {
    this.commonService.onOpenModel(event).then((val) => {
      console.log('modelddd close', val);
    });
  }

  calculateSubTotal() {
    this.subTotal = 0;
    this.carItems.forEach((cartItem: CartItem) => {
      let subPrice = 0;
      if (cartItem.product) {
        subPrice = cartItem.quantity * (cartItem.product.salePrice ?? 1);
      }
      this.subTotal = this.subTotal + subPrice;
    });

    setTimeout(() => {
      this.updateCart();
    }, 300);
  }

  updateCart(){
    this.storageService.set(environment.localCart, this.carItems).then(val=>{
      setTimeout(() => {
        this.commonService.setCartItem(true);
      }, 300);      
    });
  }

  removeCartItem(item: CartItem, index: number) {
    console.log('removeCartItem')
    this.carItems.splice(index, 1);
    this.storageService.set(environment.localCart, this.carItems).then(val=>{
      this.commonService.setCartItem(true);
      this.calculateSubTotal();
    });

  }
}
