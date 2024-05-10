import { AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddExpensePageComponent } from './accounting-page/add-expense-page/add-expense-page.component';
import { DatabaseApiService } from './@services/database-api.service';
import { AccountingPageComponent } from './accounting-page/accounting-page.component';

@Component(
  {
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, 
              CommonModule, 
              AddExpensePageComponent,
              AccountingPageComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
  }
)

export class AppComponent implements OnInit, AfterViewInit
{
  IsShowAccountingPage:boolean = true;
  IsShowSearchExpense:boolean = true;
  IsSelectingIcon:boolean = false;

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

  SearchButtonClick()
  {
    this.IsShowSearchExpense = true;
  }

  SearchIconClick()
  {
    this.IsSelectingIcon = true;
  }

  IconMouseEnter(event:MouseEvent)
  {
    let target:HTMLElement = event.target as HTMLElement;
    target.style.backgroundColor = 'gray'
  }

  IconMouseLeave(event:MouseEvent)
  {
    let target:HTMLElement = event.target as HTMLElement;
    target.style.backgroundColor = 'white'
  }

  IconSelect(event:MouseEvent)
  {
    /* not complete yet
    let target:HTMLElement = event.target as HTMLElement;
    let iconName:string = 'None';

    if(target.tagName == 'DIV')
    {
      let child:HTMLElement = target.firstChild as HTMLElement;
      iconName = child.getAttribute('class') as string;
    }
    else if(target.tagName == 'I')
    {
      iconName = target.getAttribute('class') as string;
    }
    
    this.IsSelectingIcon = false;*/
  }
}