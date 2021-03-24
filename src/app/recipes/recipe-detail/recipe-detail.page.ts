import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {
  recipe:Recipe;
  constructor(
    private recipesService:RecipesService,
    private activatedRoute:ActivatedRoute,
    private router: Router,
    private alertCtrl: AlertController
    ) { }

  ngOnInit() {
    //params map vs snapshot
    this.activatedRoute.paramMap.subscribe(paramMap=>{
      if(!paramMap.has('recipeId')){
        //redirect and return
        return;
      }
      else{
        const recipeId = paramMap.get('recipeId');
        this.recipe = this.recipesService.getRecipe(recipeId)
      }

    }
       )

  }

  onDeleteRecipe() {
    this.alertCtrl.create({
      header: 'Are you sure?',
      message: 'Do you really want to delete the recipe',
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      },
    {
        text: 'Delete',
        handler: () => {
          this.recipesService.deleteRecipe(this.recipe.id);
          this.router.navigate(['/recipes']);
        }
    }]
    }).then(alertEl => {
      alertEl.present();
    })

  }

}
