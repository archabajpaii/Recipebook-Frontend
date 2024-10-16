import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../recipe/services/recipe.service'; // Adjust path as necessary
import { Recipe } from '../../recipe/model/recipe.model'; // Adjust path as necessary
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AddIngredientDialogComponent } from '../add-ingredient-dialog/add-ingredient-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailsComponent {
  imageUrl: string =
    'https://cdn.pixabay.com/photo/2017/09/16/19/21/salad-2756467_1280.jpg';
  recipe!: Recipe;
  ingredients: any;
  fb: any;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    const id: string | null = this.route.snapshot.paramMap.get('id');

    if (id !== null) {
      this.recipeService.getRecipeById(id).subscribe((data: Recipe) => {
        this.recipe = data;
      });
    } else {
      console.error('Recipe ID is null');
    }
  }

  addIngredientsToShoppingList() {
    const username = localStorage.getItem('username');

    const shoppingListKey = `shoppingList_${username}`;

    const storedList = localStorage.getItem(shoppingListKey);
    let shoppingList: { name: string; quantity: number }[] = storedList
      ? JSON.parse(storedList)
      : [];

    this.recipe.ingredients.forEach((ingredient) => {
      const existingItem = shoppingList.find(
        (item) => item.name === ingredient.name
      );
      if (existingItem) {
        existingItem.quantity += ingredient.quantity;
      } else {
        shoppingList.push({
          name: ingredient.name,
          quantity: ingredient.quantity,
        });
      }
    });

    localStorage.setItem(shoppingListKey, JSON.stringify(shoppingList));
    this.snackBar.open('Ingredients added to shopping list!', 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  editRecipe() {
    if (this.recipe?._id) {
      this.router.navigate(['/edit-recipe', this.recipe._id]);
    } else {
      console.error('Recipe or Recipe ID is undefined');
    }
  }

  confirmDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (this.recipe?._id) {
          this.recipeService.deleteRecipe(this.recipe._id).subscribe(
            () => {
              console.log('Recipe deleted');
              this.router.navigate(['/recipes']);
            },
            (error) => {
              console.error('Error deleting recipe:', error);
            }
          );
        }
      }
    });
  }
}
