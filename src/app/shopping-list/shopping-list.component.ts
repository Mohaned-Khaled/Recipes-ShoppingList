import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  SubjectHandler: Subscription;

  constructor(private shoppinglistService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppinglistService.ourIngredients();
    this.SubjectHandler = this.shoppinglistService.ingredientsChanged.subscribe(
      (ingredients) => {
        this.ingredients = ingredients;
      }
    );
  }

  ngOnDestroy(): void {
    this.SubjectHandler.unsubscribe();
  }

  onEditItem(index: number) {
    this.shoppinglistService.startedEditting.next(index);
  }
}
