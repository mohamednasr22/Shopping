import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {

  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing= new Subject<number>();

  private ingredients: Ingredient[] = [

    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),

  ];

  getIngredients() {

    return this.ingredients.slice();

  }
  getIngredient(index:number) {

    return this.ingredients[index];

  }

  addIngredient(ingredient: Ingredient) {
    console.log("----");

    console.log(ingredient);

    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
    console.log("----");

  }

  addIngredients(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    console.log(ingredients);
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  updateIngredient(index:number ,newIngredients :Ingredient){
        this.ingredients[index]=newIngredients;
        this.ingredientsChanged.next(this.ingredients.slice());
  } 
  DeleteIngredient(index:number){
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
