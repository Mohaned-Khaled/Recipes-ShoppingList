import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipeChange = new Subject<Recipe[]>();
  recipeSelected = new Subject<Recipe>();

  recipes: Recipe[] = [
    // new Recipe('A Test Recipe', 'No description', '../../assets/c7.png', [
    //   new Ingredient('Meat', 1),
    //   new Ingredient('bread', 3),
    // ]),
    // new Recipe('A Test Recipe 2', 'No description 2', '../../assets/c7.png', [
    //   new Ingredient('Meat', 1),
    //   new Ingredient('chicken', 3),
    // ]),
  ];

  constructor(private slSerice: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChange.next(this.recipes.slice());
  }

  getRecipeByIndex(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slSerice.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChange.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChange.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChange.next(this.recipes.slice());
  }
}
