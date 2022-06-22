import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyRecipesPage } from './myrecipes.page';

import { MyRecipesPageRoutingModule } from './myrecipes-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MyRecipesPageRoutingModule,
    IonicModule,
    FlexLayoutModule
  ],
  declarations: [MyRecipesPage]
})
export class MyRecipesPageModule {}
