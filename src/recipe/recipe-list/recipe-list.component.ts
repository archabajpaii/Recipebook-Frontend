import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../recipe/model/recipe.model';
import { RecipeService } from '../../recipe/services/recipe.service';
import { Router } from '@angular/router';
import { AuthService } from '../../app/auth/services/auth.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  searchTerm: string = '';
  isLoggedIn: boolean = true;
  tokenKey = 'auth-token';
  imageUrl: string =
    'https://media.istockphoto.com/id/1687829806/vector/open-book-with-chef-hat-above.jpg?s=612x612&w=0&k=20&c=8MHkogOT9EXeKoaTYap_WFrBtUmcKgstkBOv07GOh18=';
  imgUrl: string =
    'https://cdn.pixabay.com/photo/2017/09/16/19/21/salad-2756467_1280.jpg';

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadRecipes();
  }
  goToHome() {
    this.router.navigate(['/recipes']); // Adjust the path according to your routing setup
  }

  loadRecipes(): void {
    this.recipeService.getAllRecipes().subscribe((data: Recipe[]) => {
      this.recipes = data;
      this.filteredRecipes = data;
    });
  }

  filterRecipes(): void {
    this.filteredRecipes = this.recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  logout(): void {
    console.log('Logging out...');
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
