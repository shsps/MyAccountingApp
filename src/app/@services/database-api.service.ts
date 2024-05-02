import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Expenses } from '../@models/Expenses.model';
import { DatabaseResponse } from '../@models/DatabaseResponse.model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseApiService
{
  // private url = "/api/expenses";
  public ExpensesList:Expenses[] = [];
  public TotalPrice:number = 0;

  constructor(private http: HttpClient) 
  {
    this.GetExpenses();
  }

  GetExpenses(from?:string, to?:string): void
  {
    let url = '/api/expenses/'
    if(from != undefined && to != undefined)
    {
      url += `${from}/${to}`;
    }

    this.http.get<DatabaseResponse>(url).subscribe(data=>
    {
      this.ExpensesList = data.result as Expenses[];
      this.TotalPrice = 0;
      this.ExpensesList.forEach((value) =>
      {
        this.TotalPrice += value.money;
      });
    })
  }

  AddExpenses(expense:Expenses)
  {
    this.http.post('/api/expenses', expense).subscribe();
    this.ExpensesList.push(expense);
    this.ExpensesList.sort((a, b) =>
    {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (dateA < dateB) {
          return -1;
      } else if (dateA > dateB) {
          return 1;
      } else {
          return 0;
      }
    });
  }
}
