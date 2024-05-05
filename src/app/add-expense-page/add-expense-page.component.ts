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
  dateToday:Date|undefined;
  IsShowExpensePage:boolean = false;

  

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
    this.dateToday = new Date();
  }
  
  DateClick(datePicker:HTMLInputElement)
  {
    datePicker.showPicker();
    datePicker.addEventListener('change', (event)=>
    {
      const tmp:HTMLInputElement = event.target as HTMLInputElement;
      this.dateToday = new Date(tmp.value);
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

  AddExpense_Click(event:MouseEvent)
  {
    if(!this.IsShowExpensePage)
    {
      this.IsShowExpensePage = true;
      return;
    }

    let date1:string = $("#Layout>#date>#year").text().trim();
    let date2:string = $("#Layout>#date>#month").text().trim();
    let input1:string = $("#Layout>#name>input").val() as string;
    let input2:string = $("#Layout>#price>input").val() as string;
    let input3:string = $("#Layout>#remark>textarea").val() as string;
    let icon:string = $("#Layout>#icon>button>i").attr('class') as string;

    if(this.ExpenseInputEmptyCheck())
    {
      return;
    }

    let expense:Expenses = 
    {
      id:"",
      date: `${date1}-${date2}`,
      icon: icon,
      name: input1,
      money: parseInt(input2),
      remark: input3
    }

    this.databaseApi.AddExpenses(expense);
    this.IsShowExpensePage = false;
  }

  EditExpense(id:string)
  {
    const findExpense = this.databaseApi.ExpensesList.find((value) => value.id == id);

  }

  ClosePage()
  {
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
    
    console.log(iconName);
    $('#icon>button>i').attr('class', iconName);
    this.IsSelectingIcon = false;
  }
}