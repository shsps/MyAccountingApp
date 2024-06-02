import { Expenses } from './../@models/Expenses.model';
import { DatabaseApiService } from './../@services/database-api.service';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ChartOptions, Plugin } from 'chart.js';
import { ChartEvent } from 'chart.js/dist/core/core.plugins';
import { BaseChartDirective } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';//Plugin that show persentage in pie chart

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
export class AnalyzePageComponent implements OnInit, AfterViewInit
{
  constructor(public databaseApi:DatabaseApiService) {}

  public pieChartOptions: ChartOptions<'pie'> = 
  {
    responsive: false,
    plugins:
    {
      datalabels:
      {
        color: '#FFFFFF',
        formatter: (value, context)=>
        {
          const dataSum = context.chart.data.datasets[0].data.reduce((a, b) => (a as number) + (b as number), 0);
          const percentage = (value / (dataSum as number) * 100).toFixed(2) + '%';
          return percentage;
        }
      }
    }
  };
  public pieChartLabels:string[] = [];
  public pieChartDatasets = 
  [ 
    {
      data: [] as number[],
      backgroundColor: [] as string[]
    } 
  ];
  public pieChartLegend = true;
  public pieChartPlugins: Plugin<'pie'>[] = [ChartDataLabels as Plugin<"pie">];
  backgroundColors = ['#059BFF', '#FF4069', '#FF9020', '#FFC234', '#22CFCF', '#8142FF', '#B2B6BE'];

  public sortExpenseList!:Expenses[];
  private sortExpenseListBackgroundColors:string[] = [];
  //Total price of diferent icon
  public typeTotal:{name:string, total:number}[] = [];

  ngOnInit(): void 
  {
    //Sort by icon
    this.sortExpenseList = this.databaseApi.ExpensesList.slice().sort((a,b)=>
    {
      if(a.icon < b.icon) return 1;
      if(a.icon > b.icon) return -1;

      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    let regex = /(?<=fa-)(?!solid|brands)\S+/g; //Search icon name only
    let t_index:number = 0;

    let t_data = 
    {
      name:this.sortExpenseList[0].icon.match(regex)![0], 
      total:0
    }
    this.typeTotal.push(t_data);

    this.sortExpenseList.forEach((item, index)=>
    {
      let match = item.icon.match(this.typeTotal[t_index].name);

      if(match == null)
      {
        //Add data for pie chart
        this.pieChartLabels.push(this.typeTotal[t_index].name);
        this.pieChartDatasets[0].data.push(this.typeTotal[t_index].total);
        this.pieChartDatasets[0].backgroundColor.push(this.backgroundColors[t_index % 7]);

        //Add next typeTotal
        t_index++;
        let t_data = 
        {
          name:item.icon.match(regex)![0],
          total:0
        }

        this.typeTotal.push(t_data);
      }

      this.typeTotal[t_index].total += item.money;

      this.sortExpenseListBackgroundColors.push(this.backgroundColors[t_index]);
    });

    //Add the last typeTotal
    this.pieChartLabels.push(this.typeTotal[t_index].name);
    this.pieChartDatasets[0].data.push(this.typeTotal[t_index].total);
    this.pieChartDatasets[0].backgroundColor.push(this.backgroundColors[t_index % 7]);
  }

  ngAfterViewInit(): void 
  {
    //Change color of expenseList
    for(let i = 1; i<=this.sortExpenseList.length; i++)
    {
      $(`#DataList>ul>li:nth-child(${i})`).css('backgroundColor', 
      this.sortExpenseListBackgroundColors[i-1]);
    }
  }

  ButtonClick(event:{chartEvent?:ChartEvent|undefined, active?:object[]|undefined})
  {
    console.log((event.active as any)[0].element.options.backgroundColor);
    // $('#DataList').css('background', (event.active as any)[0].element.options.backgroundColor);
  }
}
