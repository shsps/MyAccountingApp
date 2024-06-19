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

import moment from 'moment';
import { Moment } from 'moment';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { DateAdapter } from '@angular/material/core';
import { SearchAreaToolComponent } from './search-area-tool/search-area-tool.component';
import { SearchRequest } from './@models/HttpRequest.model';
import { IconListApiService } from './@services/IconList-api.service';

@Component(
  {
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, 
              CommonModule, 
              AddExpensePageComponent,
              AccountingPageComponent,
              AnalyzePageComponent,
              SearchAreaToolComponent,
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
  title = 'MyAccountingApp';
  IsShowAccountingPage:boolean = true;
  IsShowSearchExpense:boolean = false;
  IsSelectingIcon:boolean = false;
  IsShowAnalyzePage:boolean = false;
  IsShowToolPage:boolean = false;

  constructor(public databaseApi:DatabaseApiService, private iconListApi:IconListApiService) {}

  private _dateNow:Date = new Date();
  get DateNow():Date
  {
    return this._dateNow;
  }

  set DateNow(value:Date)
  {
    this._dateNow = value;
    let dateNew = new Date(value);

    //Set to first and last date of month
    this.DateFromMax = `${dateNew.getFullYear()}-${dateNew.getMonth()+1}-1`;
    dateNew.setMonth(dateNew.getMonth() + 1, 0);
    this.DateToMin = `${dateNew.getFullYear()}-${dateNew.getMonth()+1}-${dateNew.getDate()}`;

    let q:SearchRequest =
    {
      dateFrom:this.DateFromMax,
      dateTo:this.DateToMin
    }

    this.databaseApi.SearchExpense(q);
  }

  DateFromMax!:string;
  DateToMin!:string;

  DateForm = new FormControl(new Date());

  SelectInexList:number[] = [];
  
  @ViewChild('SearchQuery') SearchQuery!:ElementRef<HTMLInputElement>;
  SearchKeyword = new FormControl<string|null>(null);
  
  ngAfterViewInit(): void 
  {
    
  }
  
  ngOnInit(): void 
  {
    //Set date to first and last day of this month
    let dateNow = new Date();
    dateNow.setMonth(this.DateNow.getMonth(), 1);
    this.DateNow = dateNow;

    this.SearchKeyword.setValue('');
  }

  ButtonSrcChange(event:MouseEvent, src:string)
  {
    $(event.currentTarget as EventTarget).attr('src', src);
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
    datepicker.close();
  }

  SearchButtonClick()
  {
    
    // let searchQuery:JQuery<HTMLElement> = $('#SearchQuery>input');
    // let query:string = searchQuery.val() as string;
    
    // if(!this.IsShowSearchExpense)
    // {
    //   this.IsShowSearchExpense = true;
    //   this.SearchKeyword.setValue('');
    //   return;
    // }

    // if(this.SearchKeyword.value == '')
    // {
    //   this.databaseApi.GetExpenses();
    //   return;
    // }

    let q:SearchRequest = { keyword:this.SearchKeyword.value};
    this.databaseApi.SearchExpense(q);
    // this.CloseSearchExpense();
  }

  // CloseSearchExpense()
  // {
  //   this.IsShowSearchExpense = false;
  // }

  // SearchIconClick(event:MouseEvent)
  // {
  //   this.IsSelectingIcon = true;
  // }

  // SearchQueryClick(event:MouseEvent)
  // {
  //   let target = event.target as HTMLInputElement;

  //   if(target.style.color == 'red')
  //   {
  //     target.style.color = 'black';
  //     target.value = '';
  //   }
  // }

  // IconSelect(event:MouseEvent)
  // {
  //   let target:HTMLElement = event.currentTarget as HTMLElement;
  //   let child:HTMLElement = target.firstChild as HTMLElement;

  //   this.SearchIcon = child.getAttribute('class') as string;
    
  //   let searchQueryInput = $('#SearchQuery>input');
  //   if(searchQueryInput.css('color') == 'rgb(255, 0, 0)')
  //   {
  //     searchQueryInput.css('color', 'black');
  //     searchQueryInput.val('');
  //   }

  //   this.IsSelectingIcon = false;
  // }

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