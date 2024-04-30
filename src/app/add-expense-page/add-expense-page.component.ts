import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DatabaseApiService } from '../@services/database-api.service';

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

  constructor(private databaseApi:DatabaseApiService) {}

  ngOnInit(): void 
  {
    this.dateToday = new Date();
    // const t_date = new Date("2024-04-01")
    // console.log(t_date);
  }
  
  dateClick(datePicker:HTMLInputElement)
  {
    datePicker.showPicker();
    datePicker.addEventListener('change', (event)=>
    {
      const tmp:HTMLInputElement = event.target as HTMLInputElement;
      this.dateToday = new Date(tmp.value);
    });
  }

}