import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { expand, min } from 'rxjs';
import { Category, Product, ProductType } from 'shoping-api';
import { StorageService } from '../shared/services/storage.service';
import { environment } from 'src/environments/environment';
import { CommonService } from '../shared/services/common.service';

export interface LocalProduct extends Product{
  thumbnail?:any
  category:Category
  status: boolean | null
}
export interface CartItem {
  product?:ProductType
  productId: number
  quantity: number,
  id:number | null;
}

export interface LocalProductType extends ProductType{
  units:any;
}

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent  implements OnInit, AfterViewInit  {
  condition: number = 0;
  list: any[] = new Array(5);
  unitName:string;
  invalidQtyMsg = "Invalid quantity! Minimum value:"
  quantityFormControl:FormControl = new FormControl();
  selectedProductType:ProductType = {
    "name": "product type update name1",
    "description": "<p>This is my first product</p><h2>type ded</h2><p>&nbsp;</p>",
    "sku": "kk002",
    "minQuantity": 2,
    "price": 11.0,
    "salePrice": 13.0,
    "isDefault": false,
    "status": false,
    "units": [
        {
            "name": "kilogram",
            "symbolName": "kg",
            "id": 2
        }
    ],
    "id": 1
};
  product:LocalProduct = {  
    "name": "product 1",
    "description": "<p>test</p>",
    "thumbnail": null,
    "category": {
        "name": "category5",
        "id": 2
    },
    "status": null,
    "types": [
        {
            "name": "product type update name1",
            "description": "<p>This is my first product</p><h2>type ded</h2><p>&nbsp;</p>",
            "sku": "kk002",
            "minQuantity": 2,
            "price": 11.0,
            "salePrice": 13.0,
            "isDefault": false,
            "status": false,
            "units": [
                {
                    "name": "kilogram",
                    "symbolName": "kg",
                    "id": 2
                }
            ],
            "id": 1
        },
        {
            "name": "Test product 1d",
            "description": "<p>dsfa asd fasdf ddd</p>",
            "sku": "dsafdsaf d",
            "minQuantity": 1,
            "price": 12.0,
            "salePrice": 18.0,
            "isDefault": false,
            "status": true,
            "units": [
                {
                    "name": "meter",
                    "symbolName": "m",
                    "id": 1
                },
                {
                    "name": "kilogram",
                    "symbolName": "kg",
                    "id": 2
                }
            ],
            "id": 3
        },
        {
            "name": "Test product 133",
            "description": "<p>test desciprion dsfsd</p><p>dsf Head</p>",
            "sku": "SKU0001",
            "minQuantity": 1,
            "price": 10.0,
            "salePrice": 11.0,
            "isDefault": true,
            "status": true,
            "units": [
                {
                    "name": "unit",
                    "symbolName": "n",
                    "id": 3
                }
            ],
            "id": 2
        },

        {
          "name": "Test product 44",
          "description": "<p>test desciprion dsfsd</p><p>dsf Head</p>",
          "sku": "SKU0001",
          "minQuantity": 1,
          "price": 10.0,
          "salePrice": 11.0,
          "isDefault": true,
          "status": true,
          "units": [
              {
                  "name": "unit",
                  "symbolName": "n",
                  "id": 3
              }
          ],
          "id": 4
      },        
      {
        "name": "Test product 55",
        "description": "<p>test desciprion dsfsd</p><p>dsf Head</p>",
        "sku": "SKU0001",
        "minQuantity": 1,
        "price": 10.0,
        "salePrice": 11.0,
        "isDefault": true,
        "status": true,
        "units": [
            {
                "name": "unit",
                "symbolName": "n",
                "id": 3
            }
        ],
        "id": 5
    }
    ],
    "id": 1
 };
 numbers:number[];
  constructor(
    private cdRef:ChangeDetectorRef, 
    private storageService:StorageService,
    private commonService:CommonService) {
    this.numbers = Array(1000).fill(1000, 1, 1000).map((x,i)=>i); 
   }


  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.setUnitName();
    this.setInitialQty();
  }

  onChangeType(itemType:ProductType){
    this.selectedProductType = itemType; 
    this.setUnitName(); 
    this.setInitialQty();
  }

  setInitialQty(){
    const minVal = this.selectedProductType.minQuantity ?? 1;
    
    this.quantityFormControl?.patchValue(minVal);
    this.quantityFormControl?.clearValidators();

    this.quantityFormControl?.addValidators([Validators.required, Validators.min(minVal)]);
    this.quantityFormControl?.updateValueAndValidity();
    this.invalidQtyMsg =  `Invalid quantity! Minimum value: ${minVal}`;
    console.log('minVal', minVal);
    console.log('this.quantityFormControl', this.quantityFormControl);
    this.cdRef.detectChanges();   
  }

  setUnitName(){
    if(this.selectedProductType.units?.length){
      this.unitName = this.selectedProductType.units[0].name ? this.selectedProductType.units[0].name : "";
    }
  }

  addToCart(product:ProductType){
    const newCart:CartItem = {
      id:this.product.id ? this.product.id : null,
      productId: product.id ?? 0,
      quantity: this.quantityFormControl.value,
      product: product
    };
    this.storageService.get(environment.localCart).then((val:CartItem[])=>{
      if(val){
        const isExistIndex = val.findIndex((v:CartItem)=>v.productId == newCart.productId);
        if(isExistIndex>-1){
          val.splice(isExistIndex, 1, newCart);
        }else{
          val.push(newCart);
        } 
        this.setLocalCart(val);       
      }else{
        this.setLocalCart([newCart]); 
      }
    });
  }

  clearItem(){
    this.storageService.remove(environment.localCart);
    this.commonService.setCartItem(true);
  }

  setLocalCart(cart:CartItem[]){
    console.log('adding cart', cart)
    this.storageService.set(environment.localCart, cart);
    setTimeout(() => {
      this.commonService.setCartItem(true);
    }, 300);

  }


}
