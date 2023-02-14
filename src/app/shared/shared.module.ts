import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// To work with routing
import { RouterModule } from '@angular/router';

// Shared components
import { FooterComponent } from './../core/footer/footer.component';
import { HeaderComponent } from './../core/header/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

// To work with Material
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MomentDateModule } from '@angular/material-moment-adapter';
// For alerts
import { MatSnackBarModule } from '@angular/material/snack-bar';
//For Icons
import { MatIconModule } from '@angular/material/icon';
//For Modals
import { MatDialogModule } from '@angular/material/dialog';
//For Grids
import { MatGridListModule } from '@angular/material/grid-list';

// To work with http requests
import { HttpClientModule } from '@angular/common/http';

// To work with reactive forms
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotFoundComponent
  ],
  imports: [
    RouterModule,
    CommonModule
  ],
  exports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatDialogModule,
    MatGridListModule,
    MatSnackBarModule,
    MomentDateModule
  ]
})
export class SharedModule { }
