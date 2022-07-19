import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { ActorsPageComponent } from './pages/actors-page/actors-page.component';
import { GenresPageComponent } from './pages/genres-page/genres-page.component';
import { MoviesPageComponent } from './pages/movies-page/movies-page.component';

const appRoutes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'actor',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ActorsPageComponent,
      },
    ],
  },
  { path: 'movies', component: MoviesPageComponent },
  { path: 'genre', component: GenresPageComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRouterModule {}
