import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable, NgModuleDecorator } from '@angular/core';
import { Expenses } from '../@models/Expenses.model';
import { ResponseData } from '../@models/HttpResponse.model'
import { DatabaseResponse } from '../@models/DatabaseResponse.model';
import moment from 'moment';
import { SearchRequest } from '../@models/HttpRequest.model';
import { JsonPipe } from '@angular/common';

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
  public url:string = 'http://benzhuhost.ddns.net:8080/api/expenses/';


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
    let url2 = this.url.slice();

    if(from != undefined && to != undefined)
    {
      url2 += `${from}/${to}`;//limit period if giving from and to
      this.DateFrom = from;
      this.DateTo = to;
    }

    this.http.get<DatabaseResponse>(url2).subscribe(data=>
    {
      this.ExpensesList = data.result as Expenses[];
      this.UpdateTotalPrice();
    })
  }

  SearchExpense(q:SearchRequest):void
  {
    if(q.dateFrom == null || q.dateFrom == undefined)
    {
      q.dateFrom = '1000-1-1';
    }
    if(q.dateTo == null || q.dateTo == undefined)
    {
      q.dateTo = '9999-12-31';
    }

    this.DateFrom = q.dateFrom;
    this.DateTo = q.dateTo;

    let url2 = this.url.slice() + 'search/';
    url2 += JSON.stringify(q);

    // console.log(url2);
    this.http.get<DatabaseResponse>(url2).subscribe(data=>
    {
      this.ExpensesList = data.result as Expenses[];
      this.UpdateTotalPrice();
    });
  }

  AddExpenses(expense:Expenses)
  {
    this.http.post(this.url, expense).subscribe((response) =>
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
    this.http.delete(this.url, req).subscribe();

    this.ExpensesList = this.ExpensesList.filter((_,index) => !indexList.includes(index));
    this.UpdateTotalPrice();
  }

  EditExpense(expense:Expenses)
  {
    this.http.put(this.url, expense).subscribe();

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
