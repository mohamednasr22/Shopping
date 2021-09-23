import { Injectable } from "@angular/core";
import { Http ,Response} from "@angular/http";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable()
export class DataStorageService{
constructor(private http : Http, private recipeService:RecipeService){}
  storeRecipe(){
    return this.http.put('https://ng-recipe-book-d29c7-default-rtdb.firebaseio.com/recipes.json',
     this.recipeService.getRecipes());
    }
  getRecipe(){
      return this.http.get('https://ng-recipe-book-d29c7-default-rtdb.firebaseio.com/recipes.json')
      .subscribe((response : Response) => {
          const recipes : Recipe[] = response.json();
          this.recipeService.setRecipes(recipes);
      });
    }
}
