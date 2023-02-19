import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// To work with routing
import { RouterModule } from '@angular/router';

// Shared components
import { HeaderComponent } from './../core/header/header.component';
import { FooterComponent } from './../core/footer/footer.component';
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
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';

// To work with http requests
import { HttpClientModule } from '@angular/common/http';

// To work with reactive forms
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './components/loading/loading.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    LoadingComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatGridListModule,
    MatDividerModule
  ],
  exports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    LoadingComponent,
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
    MomentDateModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatCardModule,
    MatTabsModule,

  ]
})
export class SharedModule {}
