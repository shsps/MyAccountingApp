import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { AddExpensePageComponent } from './add-expense-page/add-expense-page.component';
import { DatabaseApiService } from '../@services/database-api.service';

@Component({
  selector: 'app-accounting-page',
  standalone: true,
  imports: [
    CommonModule,
    AddExpensePageComponent
  ],
  templateUrl: './accounting-page.component.html',
  styleUrl: './accounting-page.component.scss'
})
export class AccountingPageComponent 
{
  IsShowExpensePage:boolean = false;
  IsShowTrashCan:boolean = false;
  IsShowAddExpense:boolean = true;

  constructor(public databaseApi:DatabaseApiService) {}

  SelectInexList:number[] = [];
  @ViewChild(AddExpensePageComponent) addExpensePage!:AddExpensePageComponent;

  ButtonSrcChange(event:MouseEvent, src:string)
  {
    $(event.currentTarget as EventTarget).attr('src', src);
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
        li.style.backgroundColor = '#fcfbe1';
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
