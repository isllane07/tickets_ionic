import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'cliente',
    loadComponent: () => import('./pages/cliente/cliente.page').then(m => m.ClientePage)
  },
  {
    path: 'atendente',
    loadComponent: () => import('./pages/atendente/atendente.page').then(m => m.AtendentePage)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules },)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
