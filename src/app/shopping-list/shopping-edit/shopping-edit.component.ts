import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') newRecipeForm: NgForm;
  subscription: Subscription;
  editMode: boolean = false;
  edittedItem: Ingredient;
  edittedItemIndex: number;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditting.subscribe(
      (index) => {
        this.edittedItemIndex = index;
        this.editMode = true;
        this.edittedItem = this.shoppingListService.getIngredient(index);
        this.newRecipeForm.setValue({
          name: this.edittedItem.name,
          amount: this.edittedItem.amount,
        });
      }
    );
  }

  onSubmit() {
    console.log(this.newRecipeForm);
    // this.shoppingListService.onAddItem({
    //   name: this.newRecipeForm.value.name,
    //   amount: this.newRecipeForm.value.amount,
    // });

    // another soln
    const value = this.newRecipeForm.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      console.log(this.edittedItem);
      this.shoppingListService.updateItem(this.edittedItemIndex, newIngredient);
    } else {
      this.shoppingListService.onAddItem(newIngredient);
    }

    this.editMode = false;
    this.newRecipeForm.reset();
  }

  onClear() {
    this.editMode = false;
    this.newRecipeForm.reset();
  }

  onDelete() {
    this.shoppingListService.onDeleteIngredient(this.edittedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
