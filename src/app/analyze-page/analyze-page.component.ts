import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
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
  ngOnInit(): void 
  {

    // let canvas = $('#Ring')[0] as HTMLCanvasElement;
    // const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    // const canvasSize = 200; // 設定寬高為相同值
    // canvas.width = canvasSize;
    // canvas.height = canvasSize;

    // const centerX = canvas.width / 2;
    // const centerY = canvas.height / 2;
    // const radius = 80; // 圓半徑
    // const ringWidth = 20; // 圓環寬度
    // const startAngle = -Math.PI / 2; // 從 12 點鐘方向開始
    // const percentageBlue = 60; // 藍色圓環百分比
    // const percentageRed = 40; // 紅色圓環百分比

    // // 藍色圓環
    // const endAngleBlue = startAngle + (percentageBlue / 100) * Math.PI * 2;
    // ctx.beginPath();
    // ctx.arc(centerX, centerY, radius, startAngle, endAngleBlue);
    // ctx.lineWidth = ringWidth;
    // ctx.strokeStyle = 'blue';
    // ctx.stroke();
    
    // // 繪製藍色圓環百分比文本
    // const textBlue = `${percentageBlue}%`;
    // const angleBlue = startAngle + (endAngleBlue - startAngle) / 2; // 計算藍色圓環百分比文本位置的角度
    // const textXBlue = centerX + Math.cos(angleBlue) * (radius + ringWidth / 2) - 15 ; // 計算文本的 x 座標
    // const textYBlue = centerY + Math.sin(angleBlue) * (radius + ringWidth / 2); // 計算文本的 y 座標
    // ctx.font = '16px Arial'; // 設定字體大小
    // ctx.fillStyle = 'white';
    // ctx.fillText(textBlue, textXBlue, textYBlue); // 繪製文本
    
    // // 紅色圓環
    // const endAngleRed = endAngleBlue + (percentageRed / 100) * Math.PI * 2;
    // ctx.beginPath();
    // ctx.arc(centerX, centerY, radius, endAngleBlue, endAngleRed);
    // ctx.strokeStyle = 'red';
    // ctx.stroke();

    // // 繪製紅色圓環百分比文本
    // const textRed = `${percentageRed}%`;
    // const angleRed = endAngleBlue + (endAngleRed - endAngleBlue) / 2; // 計算紅色圓環百分比文本位置的角度
    // const textXRed = centerX + Math.cos(angleRed) * (radius + ringWidth / 2); // 計算文本的 x 座標
    // const textYRed = centerY + Math.sin(angleRed) * (radius + ringWidth / 2); // 計算文本的 y 座標
    // ctx.fillStyle = 'white';
    // ctx.fillText(textRed, textXRed, textYRed);
  }

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [ [ 'Download', 'Sales' ], [ 'In', 'Store', 'Sales' ], 'Mail Sales' ];
  public pieChartDatasets = [ {
    data: [ 300, 500, 200 ]
  } ];
  public pieChartLegend = false;
  public pieChartPlugins = [];
}
