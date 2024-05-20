import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { ChartEvent } from 'chart.js/dist/core/core.plugins';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-analyze-page',
  standalone: true,
  imports: [
    CommonModule,
    BaseChartDirective
  ],
  templateUrl: './analyze-page.component.html',
  styleUrl: './analyze-page.component.scss'
})
export class AnalyzePageComponent implements OnInit
{
  public n:number[] = [];

  public pieChartOptions: ChartOptions<'pie'> = 
  {
    responsive: false,
  };
  public pieChartLabels = [ [ 'Download', 'Sales' ], [ 'In', 'Store', 'Sales' ], 'Mail Sales' ];
  public pieChartDatasets = 
  [ 
    {
      data: [] as number[],
      backgroundColor: [] as string[]
    } 
  ];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  datas = [100, 200, 300];
  colors = ['#059BFF', '#FF4069', '#FF9020', '#FFC234', '#22CFCF', '#8142FF', '#B2B6BE'];

  ngOnInit(): void 
  {
    for(let i = 0; i < this.datas.length; i++)
    {
      this.pieChartDatasets[0].data.push(this.datas[i]);
      this.pieChartDatasets[0].backgroundColor.push(this.colors[i]);
    }
  }

  ButtonClick(event:{chartEvent?:ChartEvent|undefined, active?:object[]|undefined})
  {
    console.log((event.active as any)[0].element.options.backgroundColor);
    // $('#DataList').css('background', (event.active as any)[0].element.options.backgroundColor);
  }
}
