import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Expenses } from './@models/Expenses.model';
import { HttpClient } from '@angular/common/http';
import { DatabaseResponse } from './@models/DatabaseResponse.model';

@Component(
  {
    selector: 'app-root', 
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
  }
)
export class AppComponent implements OnInit, AfterViewInit
{
  constructor(private http:HttpClient) {}

  ExpensesList:Expenses[] = [];
  
  ngAfterViewInit(): void 
  {
  }

  ngOnInit(): void 
  {
    this.http.get<DatabaseResponse>('/api/expenses').subscribe(data=>
    {
      this.ExpensesList = data.result as Expenses[];
    });
  }
  
  title = 'MyAccountingApp';

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
    alert("click");
  }
}