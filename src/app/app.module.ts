import { DialogSetorComponent } from './setor/dialog-setor/dialog-setor.component';
import { AnnualSalesChartComponent } from './annual-sales-chart/annual-sales-chart.component';
import { Sales } from './sales.services/sales.services.module';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularMaterialModule } from './angular-material.module';


import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';

import { NgChartsModule } from 'ng2-charts';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashComponent } from './dash/dash.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { CardComponent } from './card/card.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SetorComponent } from './setor/setor.component';
import { TableSetorComponent } from './tables/table-setor/table-setor.component';
import { DislogEditSetorComponent } from './setor/dialog-setor/dislog-edit-setor/dislog-edit-setor.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavComponent,
    DashComponent,
    CardComponent,
    LineChartComponent,
    AnnualSalesChartComponent,
    DashboardComponent,
    SetorComponent,
    TableSetorComponent,
    DialogSetorComponent,
    DislogEditSetorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
   ReactiveFormsModule,
   AppRoutingModule,
   NgChartsModule,
   LayoutModule,
   MatToolbarModule,
   MatButtonModule,
   MatSidenavModule,
   MatIconModule,
   MatListModule,
   MatGridListModule,
   MatCardModule,
   MatMenuModule,
   Sales,
   HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
