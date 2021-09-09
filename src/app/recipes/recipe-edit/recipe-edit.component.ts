import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: any;
  editMode = false;
  recipeForm:any;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService) {

                
               }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) =>{
          this.id =+params['id'];
          this.editMode= params['id'] != null;
          this.initForm();
        }
      )
  }

  onSubmit(){
    console.log(this.recipeForm())
  }
  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name':new FormControl(),
        'amount':new FormControl()
      })
    )
  }
  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
        recipeName = recipe.name;
        recipeImagePath = recipe.imagePath;
        recipeDescription = recipe.description
        if(recipe['ingredients']){
           for(let intgredient of recipe.ingredients){
            recipeIngredients.push(
              new FormGroup({
                          'name':new FormControl(intgredient.name),
                          'amount':new FormControl(intgredient.amount)
                       })
                   )
               }
                
            }
        }
        this.recipeForm= new FormGroup({
          'name': new FormControl(recipeName),
          'imagePath': new FormControl(recipeImagePath),
          'description': new FormControl(recipeDescription),
          'ingredients': recipeIngredients
        });

      }
    


}
