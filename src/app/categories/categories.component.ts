import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, CategoryService } from 'shopping-api';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent  implements OnInit {  
  @Input() isEnableTitle = true;
  @Input() isEnableContent = true;
  @Output() onCategoryEmit = new EventEmitter();
  categories: Observable<Category[]>;

  constructor(private categoryService:CategoryService) { }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories(){
    this.categories = this.categoryService.getCategories();
  }

  onCategory(category:Category){
    this.onCategoryEmit.emit(category);
  }
}
