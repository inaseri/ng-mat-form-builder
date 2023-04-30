import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";

interface FormObject {
  [key: string]: any;
}

@Component({
  selector: 'lib-ng-mat-form-builder',
  template: `
      <form [formGroup]='form' (ngSubmit)='returnForm()'>
          <div class='row'>
              <div class='col' *ngFor='let item of items; let i = index'
                   [ngClass]="{ 'col-12': item?.type === 'hidden' }">

                  <div *ngIf="item.type === 'hidden'">
                      <mat-label>{{ item?.label }}</mat-label>
                      <hr class='w-100 bg-danger'/>
                  </div>

                  <div class='col' *ngIf="item?.type !== 'hidden'">
                      <mat-form-field appearance='outline' class='w-100'
                                      *ngIf="!item?.isFile">
                          <mat-label>{{ item.label }}</mat-label>

                          <!--Normal Input Control-->
                          <input
                                  matInput
                                  [formControlName]='item.formControlName'
                                  *ngIf="!item.options && item.type !== 'date' && !item?.isTextArea && item.type"
                                  [type]='item.type'
                                  [required]='item.required'
                                  [readonly]='item?.readonly'
                          />

                          <!--Normal Select Option Control-->
                          <mat-select
                                  *ngIf='item.options && !item?.isAutoComplete'
                                  [multiple]='item.isMultiple'
                                  [formControlName]='item.formControlName'
                                  [disabled]='item?.disabled'
                          >
                              <mat-option *ngFor='let option of item.options' [value]='option.value'>
                                  {{ option.name }}
                              </mat-option>
                          </mat-select>

                          <!--Auto Complete Select Option Control-->
                          <input type="text" *ngIf="item.type === 'autoComplete'"
                                 [placeholder]="item.label"
                                 matInput
                                 [formControlName]="item.formControlName"
                                 [matAutocomplete]="auto">
                          <mat-autocomplete #auto="matAutocomplete">
                              <mat-option *ngFor="let option of item.autoCompleteOptions" [value]="option">
                                  {{option}}
                              </mat-option>
                          </mat-autocomplete>


                          <!--Normal Date Picker Control-->
                          <input
                                  matInput
                                  *ngIf="item.type === 'date'"
                                  [matDatepicker]='picker'
                                  [formControlName]='item.formControlName'
                                  [readonly]='item?.readonly'
                          />
                          <mat-datepicker-toggle [for]='picker' matSuffix
                                                 *ngIf="item.type === 'date'"></mat-datepicker-toggle>
                          <mat-datepicker #picker></mat-datepicker>

                          <!--Normal Text Area Control-->
                          <textarea
                                  matInput
                                  style='line-height: 2'
                                  *ngIf='item?.isTextArea'
                                  [formControlName]='item.formControlName'
                                  [required]='item.required'
                                  [readonly]='item?.readonly'
                          ></textarea>

                          <!--Normal File Control-->
                          <input
                                  *ngIf='item?.isFile'
                                  type='file'
                                  [formControlName]='item.formControlName'
                                  [required]='item.required'
                                  [readonly]='item?.readonly'
                          />

                          <mat-hint *ngIf='item.hint'>{{ item.hint }}</mat-hint>
                      </mat-form-field>

                      <input
                              name='uploadedFile'
                              class='d-none'
                              type='file'
                              [id]="item.formControlName"
                              (change)='addFile($event, item.formControlName)'
                              *ngIf='item?.isFile'
                      />
                      <button
                              mat-raised-button
                              color='accent'
                              class='w-100 mt-3 mb-3'
                              (click)='triggerFileSelect(item.formControlName)'
                              *ngIf='item?.isFile'
                              type='button'
                      >
                          {{ form.get(item.formControlName)?.value.name || item.label }}
                      </button>
                      <mat-hint *ngIf='item?.isFile && item?.link'>
                          <a href='javascript:void(0)'
                             (click)='openFile(item?.link, item?.header)'>{{ item?.downloadLinkTitle}}</a>
                      </mat-hint>

                  </div>
              </div>
          </div>

          <div class='row mt-2' *ngIf='showSaveButton'>
              <div class='col'>
                  <button mat-raised-button [color]="saveButtonColor" [ngStyle]='{ width: buttonWidth }'
                          [disabled]='form.invalid'>
                      {{ saveButtonName }}
                  </button>
              </div>
          </div>
      </form>
  `,
  styles: [
  ]
})
export class NgMatFormBuilderComponent implements OnInit, OnChanges {

  @Input() items: any[] = [];
  @Input() formAppearance = 'outline';
  @Input() saveButtonName = 'Save';
  @Input() saveButtonColor: string = 'warn';
  @Input() showSaveButton = true;
  @Input() checkForValid = true;
  @Input() buttonWidth: any;
  @Input() patchValue: any;
  @Input() fileDownloadPath: any;
  @Input() resetForm!: boolean;

  @Output() formResult: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() valueChangesForm: EventEmitter<any> = new EventEmitter<any>();
  @Output() mainFormValueChanges: EventEmitter<any> = new EventEmitter<any>();

  form!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.resetForm) {
      this.form.reset();
    }
  }

  ngOnInit(): void {
    this.createForm();
    if (this.patchValue) {
      this.form.patchValue(this.patchValue);
      for (const item of this.items) {
        if (item.isFile) {
          this.form.get(item.formControlName)?.setValue(this.patchValue[item.formControlName]);
        }
      }
    }
  }

  createForm(): void {
    const group: FormObject = {};
    for (const item of this.items) {
      const validators = item.validators;
      group[item.formControlName] = [{value: '', disabled: item.disabled}, validators];
      if (item.options && item.isAutoComplete) {
        item.tempOptions = item.options;
      }
    }
    this.form = this.formBuilder.group(group);
    this.form.valueChanges.subscribe((result) => {
      this.valueChangesForm.emit(result);
    });
    this.mainFormValueChanges.emit(this.form);
  }

  returnForm(): void {
    this.formResult.emit(this.form);
  }

  onKey(event: any, itemIndex: any): any {
    if (!event.value) {
      this.items[itemIndex].options = this.items[itemIndex].tempOptions;
    }

    const filterValue = event.value.toLowerCase();
    this.items[itemIndex].options = this.items[itemIndex].options.filter((option: any) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  addFile(files: any, formControlName: string): void {
    this.form.get(formControlName)?.patchValue(files?.target.files?.item(0));
  }

  triggerFileSelect(id: string): void {
    document.getElementById(id)?.click();
  }

  openFile(link: string, headers: HttpHeaders): void {
    this.http.get(link, {headers: headers}).subscribe((response: any) => {
      window.open(response?.link, '_blank')
    });
  }

}
