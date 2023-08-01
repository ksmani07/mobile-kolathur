import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category, Product, ProductType } from 'shoping-api';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent  implements OnInit {
    condition: number = 0;
    list: any[] = new Array(5);
  products:Product[] = [
    {
        "name": "product 2",
        "description": "<h2>Where does it come from?</h2><p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin word</p>",
        "thumbnail": "",
        "types": [],
        "id": 2
    },
    {
        "name": "product 1",
        "description": "<p>test</p>",
        "thumbnail": "",
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
            }
        ],
        "id": 1
    }
];
category:Category = {
    name: "category5",
    description: "<p><strong>category5</strong> description</p><p>letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometime</p>",
    thumbnail: "d1920966-311d-4ea9-9fe7-2796da74abf9_test-1.jpeg",
    id:4
}
productTypes: ProductType[] =[];
  constructor(private location:Location, private router:Router) { }

  ngOnInit() { this.loadProductTypes()}
  
  loadProductTypes(){
    this.productTypes = this.products.filter(p=>p.types?.length).map(p=>p.types)?.[0] ?? [];
    console.log('this.productTypes', this.productTypes);
  }
  onBack(){
    console.log(this.location);
    this.location.back();
  }
}
