import { Injectable } from "@angular/core";
import { Http ,Response} from "@angular/http";
import 'rxjs/Rx';
import { AuthService } from "../auth/auth.service";


import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable()
export class DataStorageService{
constructor(private http : Http,
            private recipeService:RecipeService,
            private authService:AuthService
            ){}
  storeRecipe(){
    const token = this.authService.getToken();

    return this.http.put('https://ng-recipe-book-d29c7-default-rtdb.firebaseio.com/recipes.json?auth=' + token,
     this.recipeService.getRecipes());
    }
  getRecipe(){
      const token = this.authService.getToken();
      
      return this.http.get('https://ng-recipe-book-d29c7-default-rtdb.firebaseio.com/recipes.json?auth=' + token)
      .map(
        (response : Response)=>{
          const recipes : Recipe[] = response.json();
          for(let recipe of recipes){
            if(!recipe['ingredients']){
              recipe['ingredients']  = [];
            }
          }
          return recipes;
        }
      )
      .subscribe((recipes : Recipe[]) => {
          
          this.recipeService.setRecipes(recipes);
      });
    }
}
