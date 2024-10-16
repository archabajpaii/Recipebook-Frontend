import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ingredient, Recipe } from '../model/recipe.model';
import { AuthService } from '../../app/auth/services/auth.service';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private apiUrl = 'http://localhost:5005/api/recipes';

  constructor(private http: HttpClient,private authService:AuthService) {}
fetchProtectedData(){
  if(!this.authService.isAuthenticated()){
    return
  }
}
  
  private getHeaders(): HttpHeaders {
    const authToken = localStorage.getItem('auth-token');
    return new HttpHeaders({ Authorization: `Bearer ${authToken}` });
  }
  getAllRecipes(): Observable<Recipe[]> {
    const headers = this.getHeaders();
    return this.http.get<Recipe[]>(this.apiUrl,{headers});
  }

  getRecipeById(id: string): Observable<Recipe> {
    const headers = this.getHeaders();
    return this.http.get<Recipe>(`${this.apiUrl}/${id}`,{headers});
  }

  addRecipe(recipe: Recipe): Observable<Recipe> {
    const headers = this.getHeaders();
    return this.http.post<Recipe>(this.apiUrl, recipe,{headers});
  }

  updateRecipe(id: string, recipe: Recipe): Observable<Recipe> {
    const headers = this.getHeaders();
    return this.http.put<Recipe>(`${this.apiUrl}/${id}`, recipe,{headers});
  }

  deleteRecipe(id: string): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`,{headers});
  }

}
