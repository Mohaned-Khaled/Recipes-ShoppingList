import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListRouteModule } from './shopping-list-route.module';
import { ShoppingListComponent } from './shopping-list.component';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],

  imports: [FormsModule, CommonModule, ShoppingListRouteModule],
})
export class ShoppingListModule {}
