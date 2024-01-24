import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { register } from 'swiper/element/bundle';
import {Swiper} from 'swiper';
import { Category } from 'shopping-api';
import { Router } from '@angular/router';
register();
@Component({
  selector: 'app-home-default',
  templateUrl: './home-default.component.html',
  styleUrls: ['./home-default.component.scss'],
})
export class HomeDefaultComponent  implements OnInit {
  images = [
    'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    'https://images.unsplash.com/photo-1488229297570-58520851e868',
  ];
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;
  constructor(private router:Router) { }

  ngOnInit() {}

  onCategoryEmit(event:Category){
    console.log('event',event)
    this.router.navigate(["home/category", event.id])
  }

  swiperSlideChanged(e: any) {
    console.log('changed: ', e);
  }
}
