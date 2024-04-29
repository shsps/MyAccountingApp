import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

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

  ngOnInit(): void 
  {
    this.dateToday = new Date();
  }
  
}