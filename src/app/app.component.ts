import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component(
  {
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
  }
)
export class AppComponent implements OnInit
{
  ngOnInit(): void 
  {
    window.addEventListener('reszie', (event)=>
    {
      console.log(`width : ${window.innerWidth}, height : ${window.innerHeight}`);
    });
  }
  title = 'MyAccountingApp';

  BeClick(event:MouseEvent)
  {
    console.log(`width : ${window.innerWidth}, height : ${window.innerHeight}`);
  }
}
