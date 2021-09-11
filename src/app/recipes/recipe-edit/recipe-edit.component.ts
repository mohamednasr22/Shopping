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
    if(this.editMode){
      console.log(this.recipeForm)
      this.recipeService.updateRecipe(this.id,this.recipeForm);
    }else{
      this.recipeService.addRecipe(this.recipeForm);
    }
  }
  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name':new FormControl(null,Validators.required),
        'amount':new FormControl(null,[
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
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
                          'name':new FormControl(intgredient.name, Validators.required),
                          'amount':new FormControl(intgredient.amount, [
                            Validators.required,
                            Validators.pattern(/^[1-9]+[0-9]*$/)
                          ])
                       })
                   )
               }
                
            }
        }
        this.recipeForm= new FormGroup({
          'name': new FormControl(recipeName, Validators.required),
          'imagePath': new FormControl(recipeImagePath, Validators.required),
          'description': new FormControl(recipeDescription, Validators.required),
          'ingredients': recipeIngredients
        });

      }
    


}
