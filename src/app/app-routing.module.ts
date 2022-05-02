import { SetorComponent } from './setor/setor.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { DashComponent } from './dash/dash.component';
import { EquipamentosComponent } from './equipamentos/equipamentos.component';
import { ManutencoesComponent } from './manutencoes/manutencoes.component';
import { EstoquesComponent } from './estoques/estoques.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'dash', component: DashComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'line', component: LineChartComponent },
  { path: 'setor', component: SetorComponent },
  { path: 'equipamentos', component: EquipamentosComponent },
  { path: 'manutenções', component: ManutencoesComponent},
  { path: 'estoques', component: EstoquesComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
