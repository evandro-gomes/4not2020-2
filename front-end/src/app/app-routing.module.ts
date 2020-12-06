import { TurmaListComponent } from './turma/turma-list/turma-list.component';
import { CursoFormComponent } from './curso/curso-form/curso-form.component';
import { CursoListComponent } from './curso/curso-list/curso-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'curso', component: CursoListComponent},
  {path: 'curso/novo', component: CursoFormComponent},
  {path: 'curso/:id', component: CursoFormComponent},

  {path: 'turma', component: TurmaListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
