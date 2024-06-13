import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { IconListService } from '../@services/IconList.service';

@Component({
  selector: 'app-icon-selector',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './icon-selector.component.html',
  styleUrl: './icon-selector.component.scss'
})
export class IconSelectorComponent 
{
  @Output() SelectIndex = new EventEmitter<number>();

  constructor(public iconListService:IconListService){}

  IconSelect(event:MouseEvent)
  {
    let target:HTMLElement = event.currentTarget as HTMLElement;
    let child:HTMLElement = target.firstChild as HTMLElement;

    this.SelectIndex.emit(parseInt(child.getAttribute('custom_id') as string));
  }
}
