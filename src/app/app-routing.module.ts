import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BiersComponent } from './containers/biers/biers.component';
import { FavouritesComponent } from './containers/favourites/favourites.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  { path: '', component: BiersComponent, pathMatch: 'full' },
  { path: 'favourites', component: FavouritesComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
