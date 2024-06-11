import { AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddExpensePageComponent } from './accounting-page/add-expense-page/add-expense-page.component';
import { DatabaseApiService } from './@services/database-api.service';
import { AccountingPageComponent } from './accounting-page/accounting-page.component';
import { AnalyzePageComponent } from './analyze-page/analyze-page.component';
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import * as moment from 'moment';
import { Moment } from 'moment';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { DateAdapter } from '@angular/material/core';

@Component(
  {
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, 
              CommonModule, 
              AddExpensePageComponent,
              AccountingPageComponent,
              AnalyzePageComponent,
              MatFormFieldModule, 
              MatDatepickerModule,
              MatInputModule,
              MatButtonModule,
              FormsModule,
              ReactiveFormsModule,
              MatMomentDateModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
  }
)

export class AppComponent implements OnInit, AfterViewInit
{

  IsShowAccountingPage:boolean = true;
  IsShowSearchExpense:boolean = false;
  IsSelectingIcon:boolean = false;
  IsShowAnalyzePage:boolean = false;

  IconList:string[] = [
    'fa-solid fa-x',
    'fa-solid fa-pizza-slice',
    'fa-solid fa-mug-hot',
    'fa-solid fa-fish',
    'fa-solid fa-shirt',
    'fa-solid fa-bag-shopping',
    'fa-solid fa-car-side',
    'fa-solid fa-pencil',
    'fa-solid fa-store',
    'fa-solid fa-wallet',
    'fa-brands fa-cc-visa',
    'fa-solid fa-hammer',
    'fa-brands fa-google-play',
    'fa-solid fa-hospital',
    'fa-solid fa-coins',
    'fa-solid fa-otter',
    'fa-solid fa-umbrella-beach',
    'fa-solid fa-volleyball',
    'fa-solid fa-tooth',
    'fa-solid fa-taxi',
    'fa-solid fa-piggy-bank',
    'fa-solid fa-mobile-screen-button',
    'fa-solid fa-ice-cream',
    'fa-solid fa-couch',
    'fa-solid fa-cookie',
    'fa-solid fa-computer'
  ];
  SearchIcon:string = this.IconList[0];

  constructor(public databaseApi:DatabaseApiService) {}

  private _dateNow:Date = new Date();
  // DateNow!:Date;
  get DateNow():Date
  {
    return this._dateNow;
  }

  set DateNow(value:Date)
  {
    this._dateNow = value;
    let dateNew = new Date(value);

    this.DateFromMax = `${dateNew.getFullYear()}-${dateNew.getMonth()+1}-${dateNew.getDate()}`;
    dateNew.setMonth(dateNew.getMonth() + 1, 0);
    this.DateToMin = `${dateNew.getFullYear()}-${dateNew.getMonth()+1}-${dateNew.getDate()}`;

    this.databaseApi.GetExpenses(this.DateFromMax, 
      this.DateToMin);
  }

  // @ViewChild('dateFrom') dateFrom!:ElementRef<HTMLInputElement>;
  DateFromMax!:string;
  // @ViewChild('dateTo') dateTo!:ElementRef<HTMLInputElement>;
  DateToMin!:string;

  DateForm = new FormControl(new Date());

  SelectInexList:number[] = [];
  @ViewChild(AddExpensePageComponent) addExpensePage!:AddExpensePageComponent;
  
  
  ngAfterViewInit(): void 
  {
    
  }
  
  ngOnInit(): void 
  {
    //Set date to first and last day of this month
    this.DateNow = new Date();
    this.DateNow.setMonth(this.DateNow.getMonth(), 1);

    setTimeout(()=>
    {
      this.SetDateMinAndMax();
    }, 500);
  }

  ButtonSrcChange(event:MouseEvent, src:string)
  {
    $(event.currentTarget as EventTarget).attr('src', src);
  }

  SetDateMinAndMax()
  {
    let today = new Date(`${this.DateNow.getFullYear()}-${this.DateNow.getMonth()+1}-${this.DateNow.getDate()}`);
    
    today.setMonth(today.getMonth(), 1);
    this.DateFromMax = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;

    today.setMonth(today.getMonth() + 1, 0);
    this.DateToMin = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;

    console.log(this.DateFromMax, this.DateToMin);

    this.databaseApi.GetExpenses(this.DateFromMax, 
                                 this.DateToMin);
  }

  ChangeMonthArrow(isPositive:Boolean)
  {
    this.DateNow.setMonth((this.DateNow.getMonth() + (isPositive?1:-1)), 1);
    this.DateNow = new Date(this.DateNow);
  }

  SelectMonth(event: Moment, datepicker: any)
  {
    this.DateNow = event.toDate();
    this.DateForm.setValue(this.DateNow);
    console.log(this.DateNow);
    datepicker.close();
  }

  SearchButtonClick()
  {
    let searchQuery:JQuery<HTMLElement> = $('#SearchQuery>input');
    let query:string = searchQuery.val() as string;

    if(!this.IsShowSearchExpense)
    {
      this.IsShowSearchExpense = true;
      this.SearchIcon = this.IconList[0];
      searchQuery.val('');
      return;
    }

    if(this.SearchIcon == this.IconList[0] && searchQuery.val() == '')
    {
      // searchQuery.val('請輸入文字或選擇圖案');
      // searchQuery.css('color', 'red');
      this.databaseApi.GetExpenses();
      return;
    }
    // else if(searchQuery.css('color') == 'red')
    // {
    //   searchQuery.val('');
    //   searchQuery.css('color', 'black');
    //   query = '';
    // }

    let regex = /(?<=fa-)(?!solid|brands)\S+/g; //Search icon name only
    let match = this.SearchIcon.match(regex);

    if(match != null)
    {
      this.databaseApi.SearchExpense(match[0], searchQuery.val() as string);
      this.CloseSearchExpense();
    }
    else
    {
      throw new Error("Didn't find icon name");
    }
  }

  CloseSearchExpense()
  {
    this.IsShowSearchExpense = false;
  }

  SearchIconClick(event:MouseEvent)
  {
    this.IsSelectingIcon = true;
  }

  SearchQueryClick(event:MouseEvent)
  {
    let target = event.target as HTMLInputElement;

    if(target.style.color == 'red')
    {
      target.style.color = 'black';
      target.value = '';
    }
  }

  IconSelect(event:MouseEvent)
  {
    let target:HTMLElement = event.currentTarget as HTMLElement;
    let child:HTMLElement = target.firstChild as HTMLElement;

    this.SearchIcon = child.getAttribute('class') as string;
    
    let searchQueryInput = $('#SearchQuery>input');
    if(searchQueryInput.css('color') == 'rgb(255, 0, 0)')
    {
      searchQueryInput.css('color', 'black');
      searchQueryInput.val('');
    }

    this.IsSelectingIcon = false;
  }

  AccountingButtonClick()
  {
    this.IsShowAccountingPage = true;
    this.IsShowAnalyzePage = false;
  }

  AnalyzeButtonClick()
  {
    this.IsShowAccountingPage = false;
    this.IsShowAnalyzePage = true;
  }

  

  Test(event: Moment, datepicker: any)
  {
    this.DateNow = event.toDate();
    datepicker.close();
  }
}