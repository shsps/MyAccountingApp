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

  GetExpenses(): void
  {
    this.http.get<DatabaseResponse>('/api/expenses').subscribe(data=>
    {
      this.ExpensesList = data.result as Expenses[];
      this.ExpensesList.forEach((value) =>
      {
        this.TotalPrice += value.money;
      });
    })
  }

  AddExpenses(expense:Expenses)
  {
    this.http.post('/api/expenses', expense).subscribe();
  }
}
