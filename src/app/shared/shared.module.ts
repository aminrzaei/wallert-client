import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { JalaliPipe } from '../core/pipe/jalali.pipe';

const modules = [
  ReactiveFormsModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatIconModule,
  MatSlideToggleModule,
  MatDialogModule,
  CommonModule,
];
@NgModule({
  declarations: [JalaliPipe],
  imports: [...modules],
  exports: [...modules, JalaliPipe],
})
export class SharedModule {}
