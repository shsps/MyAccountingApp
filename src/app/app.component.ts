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

  // ExpensesList:Expenses[] = [];
  // TotalPrice:number = 0;
  
  ngAfterViewInit(): void 
  {
  }

  ngOnInit(): void 
  {
    // this.databaseApi.GetExpenses();
    // this.http.get<DatabaseResponse>('/api/expenses').subscribe(data=>
    // {
    //   this.ExpensesList = data.result as Expenses[];
    //   this.ExpensesList.forEach((value) =>
    //   {
    //     this.TotalPrice += value.money;
    //   });
    // });
  }

  AddExpense_Enter(event:MouseEvent)
  {
    $(event.currentTarget as EventTarget).attr('src', './assets/AddExpense_Press.png');
  }

  AddExpense_Leave(event:MouseEvent)
  {
    $(event.currentTarget as EventTarget).attr('src', './assets/AddExpense.png');
  }

  AddExpense_Click(event:MouseEvent)
  {
    this.IsShowExpensePage = !this.IsShowExpensePage;
  }
}