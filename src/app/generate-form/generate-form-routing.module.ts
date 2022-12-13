import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildComponent } from './build/build.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: '', component: BuildComponent },
  { path: 'preview', component: TestComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenerateFormRoutingModule { }
