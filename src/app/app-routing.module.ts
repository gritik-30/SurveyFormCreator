import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'build-form',
    loadChildren: () => import('./generate-form/generate-form.module').then(m => m.GenerateFormModule)
  },
  {
    path: 'forms',
    loadChildren: () => import('./submit-response/submit-response.module').then(m => m.SubmitResponseModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
