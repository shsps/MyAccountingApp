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

  SelectIdList:number[] = [];
  
  ngAfterViewInit(): void 
  {
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

    if(i.getAttribute('class') == 'fa-regular fa-square')
    {
      i.setAttribute('class', 'fa-regular fa-square-check');
      li.style.backgroundColor = '#ffcc00';
    }
    else
    {
      i.setAttribute('class', 'fa-regular fa-square');
      let listid:number = parseInt((li.getAttribute('id') as string).replace('list', ''));
      if(listid % 2)
      {
        li.style.backgroundColor = '#FFFFFF';
      }
      else
      {
        li.style.backgroundColor = '#fffd9d';
      }
    }
  }

  TrashCan_MouseEnter(event:MouseEvent)
  {
    let img = event.target as HTMLElement;
    img.setAttribute('src', '../assets/TrashCan_Press.png');
  }
  
  TrashCan_MouseLeave(event:MouseEvent)
  {
    let img = event.target as HTMLElement;
    img.setAttribute('src', '../assets/TrashCan.png');
  }

}