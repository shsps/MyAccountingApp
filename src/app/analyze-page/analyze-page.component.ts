import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analyze-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analyze-page.component.html',
  styleUrl: './analyze-page.component.scss'
})
export class AnalyzePageComponent implements OnInit
{
  ngOnInit(): void 
  {
    let canvas = $('#Ring')[0] as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    const canvasSize = 200; // 設定寬高為相同值
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 50; // 外圈半徑
    const ringWidth = 20; // 圓環寬度
    const startAngle = 0;
    const endAngle = Math.PI * 2;

    // 繪製外圈
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.lineWidth = ringWidth;
    ctx.strokeStyle = 'blue';
    ctx.stroke();

    // 繪製內圈（空心部分）
    // ctx.beginPath();
    // ctx.arc(centerX, centerY, radius - ringWidth / 2, startAngle, endAngle);
    // ctx.strokeStyle = 'white'; // 內圈填充顏色
    // ctx.stroke();
  }

}
