import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import { AddIngredientDialogComponent } from '../add-ingredient-dialog/add-ingredient-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss'],
})
export class EditRecipeComponent implements OnInit {
  editRecipeForm: FormGroup;
  _id!: string;
  message: string = '';

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.editRecipeForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: ['', Validators.required],
      time_to_prepare: [0, Validators.required],
      ingredients: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this._id = this.route.snapshot.paramMap.get('id') || '';
    this.loadRecipeDetails();
  }

  get ingredients(): FormArray {
    return this.editRecipeForm.get('ingredients') as FormArray;
  }
  loadRecipeDetails(): void {
    if (this._id) {
      this.recipeService.getRecipeById(this._id).subscribe((recipe) => {
        this.editRecipeForm.patchValue({
          title: recipe.title,
          author: recipe.author,
          description: recipe.description,
          time_to_prepare: recipe.time_to_prepare,
        });
        recipe.ingredients.forEach((ingredient: any) => {
          this.ingredients.push(
            this.fb.group({
              name: [ingredient.name, Validators.required],
              quantity: [ingredient.quantity, Validators.required],
            })
          );
        });
      });
    }
  }

  addIngredient(): void {
    const dialogRef = this.dialog.open(AddIngredientDialogComponent, {
      width: '300px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const existingIngredientIndex = this.ingredients.controls.findIndex(
          (ingredient: any) => ingredient.get('name')?.value === result.name
        );

        if (existingIngredientIndex !== -1) {
          const existingIngredient = this.ingredients.at(
            existingIngredientIndex
          );
          const updatedQuantity =
            existingIngredient.get('quantity')?.value + result.quantity;
          existingIngredient.get('quantity')?.setValue(updatedQuantity);
        } else {
          const ingredientFormGroup = this.fb.group({
            name: [result.name],
            quantity: [result.quantity],
          });

          this.ingredients.push(ingredientFormGroup);
        }
      }
    });
  }

  removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
    this.message = '';
  }

  addQuantity(index: number): void {
    const ingredientName = this.ingredients.at(index).get('name')?.value;
    const quantityControl = this.ingredients.at(index).get('quantity');

    const existingIngredientIndex = this.ingredients.controls.findIndex(
      (ctrl) => ctrl.get('name')?.value === ingredientName
    );

    if (existingIngredientIndex !== -1 && existingIngredientIndex !== index) {
      const existingQuantityControl = this.ingredients
        .at(existingIngredientIndex)
        .get('quantity');
      if (existingQuantityControl) {
        existingQuantityControl.setValue(
          existingQuantityControl.value + quantityControl?.value
        );
      }

      this.removeIngredient(index);
      this.message = `Added to existing ingredient "${ingredientName}"`;
    } else {
      if (quantityControl) {
        quantityControl.setValue(quantityControl.value + 1);
      }
      this.message = '';
    }
  }

  onSubmit(): void {
    if (this.editRecipeForm.valid) {
      this.recipeService
        .updateRecipe(this._id, this.editRecipeForm.value)
        .subscribe(() => {
          this.router.navigate(['/recipes']);
        });
    }
  }
}
