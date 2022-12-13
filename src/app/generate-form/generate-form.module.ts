import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenerateFormRoutingModule } from './generate-form-routing.module';
import { BuildComponent } from './build/build.component';
import { TestComponent } from './test/test.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BuildComponent,
    TestComponent
  ],
  imports: [
    CommonModule,
    GenerateFormRoutingModule,
    ReactiveFormsModule
  ]
})
export class GenerateFormModule { }
