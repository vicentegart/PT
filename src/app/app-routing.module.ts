import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EquipoDetalleComponent } from './components/equipo-detalle/equipo-detalle.component';
import { EquipoComponent } from './components/equipo/equipo.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';

const routes: Routes = [
  { path: 'equipo', component: EquipoComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detalle/:id', component: EquipoDetalleComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  //* uso del guard de autenticacion para componentes (vistas) 
  //* que requieran estar autenticado en el sistema

  /* {
    path: 'dashboard',
    loadChildren: () =>
      import('direccion/del/modulo/.dashboard.module').then(
        (m) => m.DashboardModule
      ),
    data: { animation: 'fade' },
    canActivate: [AuthGuard]
  }, */
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    onSameUrlNavigation: 'reload',
    anchorScrolling: 'enabled'
  })
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
