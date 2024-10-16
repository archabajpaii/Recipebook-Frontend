import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../../recipe/services/recipe.service';
import { Router } from '@angular/router';
import { Recipe } from '../../recipe/model/recipe.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss'],
})
export class AddRecipeComponent {
  recipeForm: FormGroup;
  recipe: Recipe = {
    _id: '',
    title: '',
    time_to_prepare: 0,
    ingredients: [],
    description: '',
    author: '',
    created_date: new Date(),
    thumbnail_url: '',
  };
 
  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private router: Router,
    private snackBar:MatSnackBar
  ) {
    this.recipeForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      time_to_prepare: [0, Validators.required],
      author: ['', Validators.required],
    });
  }

  onSubmit(): void {
    console.log('Form Submitted');
    console.log('Form Valid:', this.recipeForm.valid);
    console.log('Form Values:', this.recipeForm.value);

    if (this.recipeForm.valid) {
      console.log('Form is valid');

      const newRecipe = { ...this.recipeForm.value };
      console.log('New Recipe:', newRecipe);

      this.recipeService.addRecipe(newRecipe).subscribe({
        next: () => {
          this.snackBar.open('Recipe added to the list!', 'Close', {
            duration: 3000, 
            verticalPosition: 'top', 
            horizontalPosition: 'center', 
          }); 
          this.router.navigate(['/recipes']);
        },
        error: (err: any) => {
          console.error('Error adding recipe: ', err);
        },
      });
    }
  }
}
