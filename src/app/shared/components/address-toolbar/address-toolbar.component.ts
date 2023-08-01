import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-address-toolbar',
  templateUrl: './address-toolbar.component.html',
  styleUrls: ['./address-toolbar.component.scss'],
})
export class AddressToolbarComponent  implements OnInit {
  @Output() openModel = new EventEmitter();
  constructor() { }

  ngOnInit() {}
  openModal(){
    this.openModel.emit();
  }
}
