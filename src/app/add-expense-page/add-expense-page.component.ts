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
  

  constructor(private databaseApi:DatabaseApiService) {}

  ngOnInit(): void 
  {
    this.dateToday = new Date();
    // const t_date = new Date("2024-04-01")
    // console.log(t_date);
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
  }

  ClosePage()
  {
    this.IsShowExpensePage = false;
  }

  InputClick(event:MouseEvent)
  {
    let target:HTMLInputElement = event.target as HTMLInputElement;
    target.style.color = 'black';
    target.value = '';
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
}