import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component(
  {
    selector: 'app-root', 
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
  }
)
export class AppComponent implements OnInit, AfterViewInit
{
  PayList =
  [
    {
      id: '1',
      date: '2024/4/19',
      // icon: 'fa-solid fa-pizza-slice',
      icon: '♨︎',
      name: '雞腿便當',
      money: 100,
      remark: '備註1'
    },
    {
      id: '2',
      date: '2024/4/20',
      // icon: 'fa-solid fa-pizza-slice',
      icon: '♨︎',
      name: '豬排便當豬排便當',
      money: 90,
      remark: '備註2'
    },
    {
      id: '3',
      date: '2024/4/19',
      // icon: 'fa-solid fa-pizza-slice',
      icon: '♨︎',
      name: '燒肉便當',
      money: 120,
      remark: '備註3'
    },
  ]
  @ViewChild('div1') div1!:ElementRef;
  
  ngAfterViewInit(): void 
  {
    let option:DatepickerOptions =
    {
      format: 'mm/dd',
      container: 'div#Div2_1',
      showOnFocus: true
    }
    $('#Div1_2 button').on('click', ()=>
    {
      console.log($('.datepicker'));
    });
    $('.aaa').datepicker(option);
    
    console.log(option);
  }
  ngOnInit(): void 
  {
    
  }
  title = 'MyAccountingApp';
}
