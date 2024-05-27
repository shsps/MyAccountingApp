import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Expenses } from '../@models/Expenses.model';
import { ResponseData } from '../@models/HttpResponse.model'
import { DatabaseResponse } from '../@models/DatabaseResponse.model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseApiService
{
  // private url = "/api/expenses";
  public ExpensesList:Expenses[] = [];
  public TotalPrice:number = 0;
  private DateFrom!:string;
  private DateTo!:string;


  constructor(private http: HttpClient) {}

  UpdateTotalPrice()
  {
    this.TotalPrice = 0;

    this.ExpensesList.forEach((value) =>
    {
      this.TotalPrice += value.money;
    });
  }

  SortExpenseList()
  {
    this.ExpensesList.sort((a, b) =>
    {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      
      if (dateA < dateB) return -1;
      else if (dateA > dateB) return 1;
      else return 0;
    });
  }

  GetExpenses(from?:string, to?:string): void
  {
    let url = '/api/expenses/'
    if(from != undefined && to != undefined)
    {
      url += `${from}/${to}`;//limit period if giving from and to
      this.DateFrom = from;
      this.DateTo = to;
    }

    this.http.get<DatabaseResponse>(url).subscribe(data=>
    {
      this.ExpensesList = data.result as Expenses[];
      this.UpdateTotalPrice();
    })
  }

  SearchExpense(icon:string, searchQuery:string):void
  {
    let url = '/api/expenses/search/';
    url += icon == 'fa-solid fa-x' ? 'n': icon;
    url += '/'
    url += searchQuery == '' ? 'n': searchQuery;

    this.http.get<DatabaseResponse>(url).subscribe(data=>
    {
      this.ExpensesList = data.result as Expenses[];
      this.UpdateTotalPrice();
    });
  }

  AddExpenses(expense:Expenses)
  {
    this.http.post('/api/expenses', expense).subscribe((response) =>
    {
      let res = response as ResponseData;
      
      let getId:number = res.result.insertId;
      let dateNow = new Date(expense.date);
      let dateFrom = new Date(this.DateFrom);
      let dateTo = new Date(this.DateTo);

      //Show if between the period
      if(dateNow >= dateFrom && dateNow <= dateTo)
      {
        expense.id = String(getId);
        this.ExpensesList.push(expense);
        
        this.SortExpenseList();
        this.UpdateTotalPrice();
      }
    });
    
  }

  DeleteExpense(indexList:number[])
  {
    let idList:string[] = [];
    indexList.forEach((value) =>
    {
      idList.push(this.ExpensesList[value].id);
    })

    let ids = {ids:idList};
    let req = {body:ids}
    this.http.delete('/api/expenses', req).subscribe();

    this.ExpensesList = this.ExpensesList.filter((_,index) => !indexList.includes(index));
    this.UpdateTotalPrice();
  }

  EditExpense(expense:Expenses)
  {
    this.http.put('/api/expenses', expense).subscribe();

    let findExpense = this.ExpensesList.find((value) => value.id==expense.id) as Expenses;
    findExpense.date = expense.date;
    findExpense.icon = expense.icon;
    findExpense.money = expense.money;
    findExpense.name = expense.name;
    findExpense.remark = expense.remark;

    this.ExpensesList.sort

    this.SortExpenseList();
    this.UpdateTotalPrice();
  }
}
