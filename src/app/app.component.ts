import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
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
  IsShowExpensePage:boolean = false;
  IsShowTrashCan:boolean = false;
  IsShowAddExpense:boolean = true;

  constructor(public databaseApi:DatabaseApiService) {}

  @ViewChild('dateFrom') dateFrom!:ElementRef<HTMLInputElement>;
  DateFromMax!:string;
  @ViewChild('dateTo') dateTo!:ElementRef<HTMLInputElement>;
  DateToMin!:string;

  SelectInexList:number[] = [];
  @ViewChild(AddExpensePageComponent) addExpensePage!:AddExpensePageComponent;
  
  
  ngAfterViewInit(): void 
  {
    //Set date to first and last day of this month
    let today = new Date();
    today.setMonth(today.getMonth(), 1);
    this.dateFrom.nativeElement.valueAsDate = today;

    today.setMonth(today.getMonth() + 1, 0);
    this.dateTo.nativeElement.valueAsDate = today;

    setTimeout(()=>
    {
      this.SetDateMinAndMax();
    }, 500);
  }
  
  ngOnInit(): void 
  {
  }

  ButtonSrcChange(event:MouseEvent, src:string)
  {
    $(event.currentTarget as EventTarget).attr('src', src);
  }

  SetDateMinAndMax()
  {
    this.DateFromMax = this.dateTo.nativeElement.value as string;
    this.DateToMin = this.dateFrom.nativeElement.value as string;

    this.databaseApi.GetExpenses(this.dateFrom.nativeElement.value, this.dateTo.nativeElement.value);
  }

  ListCheckClick(event:MouseEvent)
  {
    let i = event.target as HTMLElement;
    let li = i.parentElement as HTMLElement;
    let listIndex:number = parseInt((li.getAttribute('id') as string).replace('list', ''));
    
    if(i.getAttribute('class') == 'fa-regular fa-square') //check
    {
      i.setAttribute('class', 'fa-regular fa-square-check');
      li.style.backgroundColor = '#ffcc00';
      this.SelectInexList.push(listIndex);

      this.IsShowTrashCan = true;
      this.IsShowAddExpense =false;
    }
    else //uncheck
    {
      i.setAttribute('class', 'fa-regular fa-square');
      this.SelectInexList = this.SelectInexList.filter( num => num != listIndex)
      if(listIndex % 2)
      {
        li.style.backgroundColor = '#FFFFFF';
      }
      else
      {
        li.style.backgroundColor = '#fffd9d';
      }

      if(this.SelectInexList.length == 0)
      {
        this.IsShowTrashCan = false;
        this.IsShowAddExpense = true;
      }
    }
  }

  TrashCan_MouseClick()
  {
    this.databaseApi.DeleteExpense(this.SelectInexList);

    this.SelectInexList = [];
    this.IsShowTrashCan = false;
    this.IsShowAddExpense = true;
  }

  AddExpenseClick()
  {
    this.IsShowExpensePage = true;

    this.addExpensePage.AddExpenseButton();
  }

  EditExpenseClick(event:MouseEvent)
  {
    if(this.SelectInexList.length > 0) return;

    this.IsShowExpensePage = true;

    const target = event.currentTarget as HTMLElement;
    const parentElement = target.parentElement as HTMLElement;
    const id = parentElement.children[6].textContent as string;

    this.addExpensePage.EditExpenseButton(id);
  }
}