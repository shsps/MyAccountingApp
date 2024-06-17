import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import moment from 'moment';
import { IconSelectorComponent } from '../icon-selector/icon-selector.component';
import { CommonModule } from '@angular/common';
import { IconListApiService } from '../@services/IconList-api.service';
import { DatabaseApiService } from '../@services/database-api.service';
import { SearchRequest } from '../@models/HttpRequest.model';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY/M/D',
    monthYearLabel: 'YYYY M月',
    dateA11yLabel: 'YYYY/M/D',
    monthYearA11yLabel: 'YYYY MM',
  },
};

@Component({
  selector: 'app-search-area-tool',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    IconSelectorComponent
  ],
  providers: [
    provideMomentDateAdapter(MY_FORMATS)
  ],
  templateUrl: './search-area-tool.component.html',
  styleUrl: './search-area-tool.component.scss'
})

export class SearchAreaToolComponent
{
  readonly DateRange = new FormGroup
  ({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null)
  });

  SelectIndex:number = 0;
  IsSelectingIcon:boolean = false;

  constructor(public iconListApi:IconListApiService, private databaseApi:DatabaseApiService) {}

  @Output() OnSearchButtonClick = new EventEmitter();
  
  OnSelectIcon(iconIndex:number)
  {
    this.SelectIndex = iconIndex;
    this.IsSelectingIcon = false;
  }

  OnSearchToolButtonClick()
  {
    let q:SearchRequest =
    {
      icon:this.iconListApi.IconList[this.SelectIndex],
      dateFrom:this.DateRange.value.start?moment(this.DateRange.value.start).format('YYYY-M-D'):null,
      dateTo:this.DateRange.value.end?moment(this.DateRange.value.end).format('YYYY-M-D'):null
    }
    
    this.databaseApi.SearchExpense(q);

    this.OnSearchButtonClick.emit();
  }
}
