import {NgModule} from '@angular/core';
import {NgMatFormBuilderComponent} from './ng-mat-form-builder.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";


@NgModule({
  declarations: [
    NgMatFormBuilderComponent
  ],
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatOptionModule,
    MatSelectModule,
    MatNativeDateModule,
    NgStyle,
    NgClass,
    NgForOf,
    NgIf,

  ],
  exports: [
    NgMatFormBuilderComponent
  ]
})
export class NgMatFormBuilderModule {
}
