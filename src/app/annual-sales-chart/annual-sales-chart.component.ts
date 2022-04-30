import { Sales } from './../sales.services/sales.services.module';

import { ChartDataset, ChartOptions, Color,ChartType } from 'chart.js';
import { Label } from 'ng2-charts/fesm2020/ng2-charts.mjs';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-annual-sales-chart',
  templateUrl: './annual-sales-chart.component.html',
  styleUrls: ['./annual-sales-chart.component.css']
})
export class AnnualSalesChartComponent implements OnInit {

  public lineChartOptions: ChartOptions = {
    responsive: true,
  };

  public salesChartData: ChartDataset[] = [
    { data: [], label: 'Total Sales' },
  ];

  public salesChartLabels: Label[] = [];
  constructor(private salesService: Sales) {


   }
   public lineChartLegend = true;
   public lineChartType: ChartType = 'line';
   public lineChartPlugins = [];
   ngOnInit() {
    this.salesService.getSalesByMonth().subscribe({
      next: salesItems => {
        salesItems.forEach(li => {
          this.salesChartData[0].data.push(li.revenue);
          this.salesChartLabels.push(li.month);
        });
      },
    });
  }
 }


