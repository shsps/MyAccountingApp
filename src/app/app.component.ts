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

    if(this.IsShowExpensePage) return;

    let date1:JQuery<HTMLElement> = $("app-add-expense-page>#Layout>#date>#year");
    let date2:JQuery<HTMLElement> = $("app-add-expense-page>#Layout>#date>#month");
    let input1:JQuery<HTMLElement> = $("app-add-expense-page>#Layout>#name>input");
    let input2:JQuery<HTMLElement> = $("app-add-expense-page>#Layout>#price>input");
    let input3:JQuery<HTMLElement> = $("app-add-expense-page>#Layout>#remark>textarea");
    let icon:JQuery<HTMLElement> = $("app-add-expense-page>#Layout>#icon>button>i");

    let expense:Expenses = 
    {
      id:"",
      date: (date1.text()+"-"+date2.text()),
      icon: icon.attr('class') as string,
      name: input2.val() as string,
      money: input2.val() as number,
      remark: input3.val() as string

    }

    this.databaseApi.AddExpenses(expense);
    // console.log(date1.text());
    // console.log(date2.text());
    // console.log(input2.val());
    // console.log(input1.val());
    // console.log(input3.val());
    // console.log(icon.attr('class'));
  }
}