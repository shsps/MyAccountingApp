import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Expenses } from './@models/Expenses.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DatabaseResponse } from './@models/DatabaseResponse.model';
import { CommonModule } from '@angular/common';
import { AddExpensePageComponent } from './add-expense-page/add-expense-page.component';
import { DatabaseApiService } from './@services/database-api.service';

@Component(
  {
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, 
              CommonModule, 
              AddExpensePageComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
  }
)

export class AppComponent implements OnInit, AfterViewInit
{
  title = 'MyAccountingApp';
  IsShowExpensePage:boolean = false;

  constructor(public databaseApi:DatabaseApiService) {}

  @ViewChild('dateFrom') dateFrom!:ElementRef<HTMLInputElement>;
  DateFromMax!:string;
  @ViewChild('dateTo') dateTo!:ElementRef<HTMLInputElement>;
  DateToMin!:string;
  
  ngAfterViewInit(): void 
  {
    let today = new Date();
    today.setMonth(today.getMonth(), 1);
    this.dateFrom.nativeElement.valueAsDate = today;
    // this.dateFrom.nativeElement.addEventListener('change', () => this.SetDateMinAndMax());

    today.setMonth(today.getMonth() + 1, 0);
    this.dateTo.nativeElement.valueAsDate = today;
    // this.dateTo.nativeElement.addEventListener('change', () => this.SetDateMinAndMax);

    setTimeout(()=>
    {
      this.SetDateMinAndMax();
    }, 500);
  }
  
  ngOnInit(): void 
  {
  }

  SetDateMinAndMax()
  {
    console.log(this.dateFrom.nativeElement.value + '~' + this.dateTo.nativeElement.value);
    this.DateFromMax = this.dateTo.nativeElement.value as string;
    this.DateToMin = this.dateFrom.nativeElement.value as string;
  }
}