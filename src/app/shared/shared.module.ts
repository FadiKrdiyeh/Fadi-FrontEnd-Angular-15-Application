import { RouterModule } from '@angular/router';
import { FooterComponent } from './../core/footer/footer.component';
import { HeaderComponent } from './../core/header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    MatButtonModule
  ]
})
export class SharedModule { }
