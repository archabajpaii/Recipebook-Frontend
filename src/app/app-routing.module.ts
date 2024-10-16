import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { RecipeListComponent } from '../recipe/recipe-list/recipe-list.component';
import { AuthGuard } from './auth/auth.guard';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { RecipeDetailsComponent } from '../recipe/recipe-detail/recipe-detail.component';
import { EditRecipeComponent } from '../recipe/edit-recipe/edit-recipe.component';
import { ShoppingListComponent } from '../recipe/shopping-list/shopping-list.component';

const routes: Routes = [
  { path: 'recipes', component: RecipeListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'add-recipe', component: AddRecipeComponent},
  {path: 'details/:id', component: RecipeDetailsComponent},
  {path: 'edit-recipe/:id', component: EditRecipeComponent},
  {path: 'shopping-list', component: ShoppingListComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
