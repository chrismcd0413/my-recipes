import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FindRecipesPage } from './find-recipes.page';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FindRecipesPageRoutingModule } from './find-recipes-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: FindRecipesPage }]),
    FindRecipesPageRoutingModule,
    FlexLayoutModule
  ],
  declarations: [FindRecipesPage]
})
export class FindRecipesPageModule {}
