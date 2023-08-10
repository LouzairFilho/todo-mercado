import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosComponent } from './todos.component';
import { RouterModule, Routes } from '@angular/router';
import { ImportsGlobalModule } from '../imports-global.module';


const ROUTES: Routes = [
  {path: '', component: TodosComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    ImportsGlobalModule
  ],
  declarations: [TodosComponent]
})
export class TodosModule { }
