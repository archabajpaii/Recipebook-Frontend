import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipe-detail/recipe-detail.component';
import { RecipeService } from './services/recipe.service';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AddRecipeComponent } from '../app/add-recipe/add-recipe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { MatIconModule } from '@angular/material/icon';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';
import { AddIngredientDialogComponent } from './add-ingredient-dialog/add-ingredient-dialog.component';
import { TimeConvertPipe } from '../app/time-convert.pipe';

@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeDetailsComponent,
    AddRecipeComponent,
    EditRecipeComponent,
    ShoppingListComponent,
    TimeConvertPipe,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    RouterModule,
    MatListModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTabsModule,
  ],
  providers: [RecipeService],
  exports: [RecipeListComponent, RecipeDetailsComponent],
})
export class RecipeModule {}
