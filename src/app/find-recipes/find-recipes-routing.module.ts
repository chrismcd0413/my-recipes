import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { FindRecipesPage } from './find-recipes.page';

const routes: Routes = [
  {
    path: '',
    component: FindRecipesPage,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FindRecipesPageRoutingModule {}
