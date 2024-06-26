import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, numberAttribute} from '@angular/core';
import { DatabaseApiService } from '../../@services/database-api.service';
import { Expenses } from '../../@models/Expenses.model';
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
  IsShowExpense:boolean = false;
  IsShowAddButton:boolean = false;
  IsShowEditButton:boolean = false;

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

  IconText:string = this.IconList[0];
  NameText:string = '';
  PriceText:string = '';
  RemarkText:string = '';
  ExpenseId:string = '';

  
  IsSelectingIcon:boolean = false;

  constructor(private databaseApi:DatabaseApiService) {}

  ngOnInit(): void 
  {
    this.dateNow = new Date();
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

  OpenPage()
  {
    this.IsShowExpense = true;

    let div = $('#Add_Expense_RootLayout');
    div.width('600px');
    div.height('500px');

    this.dateNow = new Date();
    this.IconText = this.IconList[0];
    this.NameText = '';
    this.PriceText = '';
    this.RemarkText = '';
    this.ExpenseId = '';
  }

  ClosePage()
  {
    let div = $('#Add_Expense_RootLayout');
    div.width('auto');
    div.height('auto');

    this.IsShowAddButton = false;
    this.IsShowEditButton = false;
    this.IsShowExpense = false;
  }

  ButtonSrcChange(event:MouseEvent, src:string)
  {
    $(event.currentTarget as EventTarget).attr('src', src);
  }

  ReadExpense():Expenses
  {
    let input1:string = $("#Layout>#name>input").val() as string;
    let input2:string = $("#Layout>#price>input").val() as string;
    let input3:string = $("#Layout>#remark>textarea").val() as string;

    let year = this.dateNow?.getFullYear();
    let month = String(this.dateNow?.getMonth() as number + 1).padStart(2, '0');
    let day = String(this.dateNow?.getDate()).padStart(2, '0');

    let expense:Expenses = 
    {
      id:this.ExpenseId,
      date: `${year}-${month}-${day}`,
      icon: this.IconText,
      name: input1,
      money: parseInt(input2),
      remark: input3
    }

    return expense
  }

  AddExpenseButton()
  {
    this.OpenPage();

    this.ExpenseId = '';

    this.IsShowAddButton = true;
  }

  AddExpense()
  {
    if(this.ExpenseInputEmptyCheck())
    {
      return;
    }

    let expense:Expenses = this.ReadExpense()

    this.databaseApi.AddExpenses(expense);
    
    this.ClosePage();
  }

  EditExpenseButton(id:string)
  {
    this.OpenPage();
    this.ExpenseId = id;
    this.IsShowEditButton = true;

    const findExpense = this.databaseApi.ExpensesList.find((value) => value.id == id) as Expenses;
    this.dateNow = new Date(findExpense.date);
    this.IconText = findExpense.icon;
    this.NameText = findExpense.name;
    this.PriceText = String(findExpense.money);
    this.RemarkText = findExpense.remark;
  }

  EditExpense()
  {
    if(this.ExpenseInputEmptyCheck())
    {
      return;
    }

    let expense:Expenses = this.ReadExpense();

    this.databaseApi.EditExpense(expense);

    this.ClosePage();
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
    /*FontAwesome exchange the position of every icon name, 
    like fa-solid fa-pizza-slice to fa-pizza-slice fa-solid.
    So i need to get index rather then class name.*/
    let iconId:number = 0;

    if(target.tagName == 'DIV')
    {
      let child:HTMLElement = target.firstChild as HTMLElement;
      iconId = parseInt(child.getAttribute('custom_id') as string);
    }
    else if(target.tagName == 'I')
    {
      iconId = parseInt(target.getAttribute('custom_id') as string);
    }
    
    this.IconText = this.IconList[iconId];
    this.IsSelectingIcon = false;
  }
}