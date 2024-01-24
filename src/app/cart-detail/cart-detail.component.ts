import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category, ProductType } from 'shopping-api';
import { environment } from 'src/environments/environment';
import { CartItem } from '../product-details/product-details.component';
import { CommonService } from '../shared/services/common.service';
import { StorageService } from '../shared/services/storage.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss'],
})
export class CartDetailComponent  implements OnInit {

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

  ngOnInit() { 
    setTimeout(() => {
    this.lodaCartItem();
  }, 300);}
  ngAfterViewInit(): void {}

  ionViewDidLeave() {    
    console.log('==========cart=====ionViewDidLeave==============')
  }

  ionViewWillEnter(){
   
  }

  lodaCartItem() {
    this.storageService.get(environment.localCart).then((cartItem) => {
      console.log('cartItem', cartItem);
      this.carItems = cartItem ?? [];
      this.calculateSubTotal();
    })
  }

  onBack() {
    this.location?.back();
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
    this.storageService.set(environment.localCart,this.carItems.length ? this.carItems : null).then(val=>{
      this.commonService.setCartItem(true);
      this.calculateSubTotal();
    });

    if(!this.carItems.length){
    setTimeout(() => {
      this.storageService.remove(environment.localCart);
    }, 300);      
    }
  }

  proceedCart(){
    this.storageService.get(environment.signIn).then((signIn)=>{
      console.log('signIn',signIn);
      if(!signIn){
        this.router.navigate(["account/signup"])
      }
    });

    // this.commonService.isSignIn().subscribe((signIn)=>{
    //   console.log('signIn',signIn);
    // })
  }

}
