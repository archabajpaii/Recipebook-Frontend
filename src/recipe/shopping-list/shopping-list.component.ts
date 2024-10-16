import { Component } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Ingredient } from '../model/recipe.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent {
  shoppingList: { name: string; quantity: number }[] = [];
  username: string | null = null;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.username = this.getUsernameFromLocalStorage();

    this.loadShoppingList();
  }

  getUsernameFromLocalStorage(): string | null {
    return localStorage.getItem('username');
  }

  loadShoppingList() {
    if (this.username) {
      const storedList = localStorage.getItem(`shoppingList_${this.username}`);
      console.log(`Stored Shopping List for ${this.username}:`, storedList);
      if (storedList) {
        this.shoppingList = JSON.parse(storedList);
      }
    } else {
      console.error('No username found in local storage.');
    }
  }

  saveShoppingList() {
    if (this.username) {
      localStorage.setItem(
        `shoppingList_${this.username}`,
        JSON.stringify(this.shoppingList)
      );
      console.log(`Shopping list saved for ${this.username}`);
    } else {
      console.error(
        'No username found in local storage. Unable to save shopping list.'
      );
    }
  }

  incrementQuantity(item: { name: string; quantity: number }) {
    item.quantity++;
    this.saveShoppingList();
  }

  decrementQuantity(item: { name: string; quantity: number }) {
    if (item.quantity > 1) {
      item.quantity--;
      this.saveShoppingList();
    } else {
      this.removeIngredient(item);
    }
  }

  confirmDelete(item: { name: string; quantity: number }) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.removeIngredient(item);
      }
    });
  }

  removeIngredient(item: { name: string; quantity: number }) {
    const index = this.shoppingList.indexOf(item);
    if (index !== -1) {
      this.shoppingList.splice(index, 1);
      this.saveShoppingList();
    }
  }
}
