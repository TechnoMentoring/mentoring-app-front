import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import {MatCardModule} from '@angular/material/card';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';





@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTableModule,
    MatNativeDateModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatMenuModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MatSortModule,
    MatCardModule,
    MatSidenavModule,
  ],
  exports:[

    MatNativeDateModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatTableModule,
    MatMenuModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatSortModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
    
  ]
})
export class MaterialModule { }
