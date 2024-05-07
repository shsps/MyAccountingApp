import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { DatabaseApiService } from '../@services/database-api.service';
import { Expenses } from '../@models/Expenses.model';
import { parseHostBindings } from '@angular/compiler';

@Component({
  selector: 'app-add-expense-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-expense-page.component.html',
  styleUrl: './add-expense-page.component.scss'
})
export class AddExpensePageComponent implements OnInit
{
  dateNow:Date|undefined;
  IsShowExpensePage:boolean = false;

  IconText:string = 'fa-solid fa-pizza-slice';
  NameText:string = '';
  PriceText:string = '';
  RemarkText:string = '';
  
  IconList:string[] = [
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
  IsSelectingIcon:boolean = false;

  constructor(private databaseApi:DatabaseApiService) {}

  ngOnInit(): void 
  {
    this.dateNow = new Date();
    // const t_date = new Date("2024-04-01")
    // console.log(t_date);
  }
  
  DateClick(datePicker:HTMLInputElement)
  {
    datePicker.showPicker();
    datePicker.addEventListener('change', (event)=>
    {
      const tmp:HTMLInputElement = event.target as HTMLInputElement;
      this.dateNow = new Date(tmp.value);
    });
  }

  AddExpense_Enter(event:MouseEvent)
  {
    $(event.currentTarget as EventTarget).attr('src', './assets/AddExpense_Press.png');
  }

  AddExpense_Leave(event:MouseEvent)
  {
    $(event.currentTarget as EventTarget).attr('src', './assets/AddExpense.png');
  }

  AddExpense_Click(event:MouseEvent, div:HTMLDivElement)
  {
    if(!this.IsShowExpensePage)
    {
      div.style.width = '600px';
      div.style.height = '500px';
      this.IsShowExpensePage = true;
      return;
    }

    let input1:string = $("#Layout>#name>input").val() as string;
    let input2:string = $("#Layout>#price>input").val() as string;
    let input3:string = $("#Layout>#remark>textarea").val() as string;

    let year = this.dateNow?.getFullYear();
    let month = String(this.dateNow?.getMonth() as number + 1).padStart(2, '0');
    let day = String(this.dateNow?.getDate()).padStart(2, '0');

    if(this.ExpenseInputEmptyCheck())
    {
      return;
    }

    let expense:Expenses = 
    {
      id:"",
      date: `${year}-${month}-${day}`,
      icon: this.IconText,
      name: input1,
      money: parseInt(input2),
      remark: input3
    }

    this.databaseApi.AddExpenses(expense);
    this.IsShowExpensePage = false;
  }

  ClosePage(div:HTMLDivElement)
  {
    div.style.width = 'auto';
    div.style.height = 'auto';
    this.IsShowExpensePage = false;
  }

  InputClick(event:MouseEvent)
  {
    let target:HTMLInputElement = event.target as HTMLInputElement;
    if(target.style.color != 'black')
    {
      target.style.color = 'black';
      target.value = '';
    }
  }

  ExpenseInputEmptyCheck():boolean
  {
    let priceInput = $("#Layout>#price>input");
    let price:number = parseInt(priceInput.val() as string);

    if(isNaN(price))
    {
      priceInput.css('color', 'red');
      priceInput.val('請輸入數字');
      return true;
    }
    else if(price <= 0)
    {
      priceInput.css('color', 'red');
      priceInput.val('價格需大於0');
      return true;
    }
    
    let nameInput = $("#Layout>#name>input");

    if(nameInput.val() == '')
    {
      nameInput.css('color', 'red');
      nameInput.val('請輸入名稱');
      return true;
    }

    return false;
  }

  IconButtonClick()
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
    
    this.IconText = iconName;
    this.IsSelectingIcon = false;
  }
}