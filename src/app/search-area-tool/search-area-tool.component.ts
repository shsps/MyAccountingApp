import { Component } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
// import * as _moment from 'moment';
import moment from 'moment';
import { IconSelectorComponent } from '../icon-selector/icon-selector.component';
import { CommonModule } from '@angular/common';
import { IconListService } from '../@services/IconList.service';
// tslint:disable-next-line:no-duplicate-imports
// import {default as _rollupMoment} from 'moment';

// const moment = _rollupMoment || _moment;

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
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    IconSelectorComponent
  ],
  providers: [
    provideMomentDateAdapter(MY_FORMATS)
  ],
  templateUrl: './search-area-tool.component.html',
  styleUrl: './search-area-tool.component.scss'
})

export class SearchAreaToolComponent {
  date = new FormControl(moment());

  SelectIndex:number = 0;
  IsSelectingIcon:boolean = false;

  constructor(public iconListService:IconListService){}

  OnSelectIcon(iconIndex:number)
  {
    this.SelectIndex = iconIndex;
    this.IsSelectingIcon = false;
  }
}
