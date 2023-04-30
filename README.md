# Ng Mat Form Builder

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.0.

This library help you to create forms fast and clean without no more repeated codes.

In this package we are using angular material and angular reactive forms.

## Usage

#### Install package with this command in root of your project

`npm i ng-mat-form-builder`

#### In your module file, import the package by this line

```typescript
import {NgMatFormBuilderModule} from "ng-mat-form-builder";

@NgModule({
  imports: [
    ...
      NgMatFormBuilderModule,
  ]
})
```

#### Open your component and put this codes on your typescript file

```typescript
import {FormGroup} from "@angular/forms";

createSettingReceptor = [
  {
    type: 'text',
    label: 'Fist Name',
    formControlName: 'firstName',
    validators: [Validators.required],
    hint: null,
    options: null,
    required: true,
    isMultiple: null,
  },
];

create(formEvent: FormGroup): void {
  // you will be get the resut of form after submit
}
```

#### Next that open your html file in component

```html

<lib-ng-mat-form-builder [items]="createSettingReceptor"
                         (formResult)="create($event)"
                         [saveButtonName]="'submit'">
</lib-ng-mat-form-builder>
```

## Apis

#### inputs

| name            | type                   | description                                                 | required |
|-----------------|------------------------|-------------------------------------------------------------|----------|
| items           | array[]                | list of items in form                                       | true     |
| formAppearance  | MatFormFieldAppearance | 'fill' or 'outline'                                         | true     |
| saveButtonName  | string                 | name of submit button (as default that set in 'save')       | false    |
| saveButtonColor | string                 | color of your submit button (as default that set in 'warn') | false    |
| showSaveButton  | boolean                | default is true                                             | false    |
| checkForValid   | boolean                | default is true                                             | false    |
| buttonWidth     | string                 | button size in px or % or anything that you need            | false    |
| patchValue      | object                 | this would be set your data if you want                     | false    |
| resetForm       | boolean                | this would be reset form, if you set it true                | false    |

### outputs

| name             | type      | description                                                                     |
|------------------|-----------|---------------------------------------------------------------------------------|
| formResult       | FormGroup | result of form                                                                  |
| valueChangesForm | FromGroup | get value changes of form, also you can set the value into form with patchValue |

## Structure of items

you should use this object as items type, note that the keys has a default value in this object are not required.

```typescript
import {HttpHeaders} from "@angular/common/http";

export class FormBuilderModel {
  type: any; // select, number, text, tel, date;
  label: any;
  formControlName: any;
  validators: any; // array or null;
  hint: any;
  options: any; // array or null;
  required = false;
  isTextArea = false;
  isMultiple = false;
  isAutoComplete = false;
  disabled = false;
  readonly = false;
  isFile = false;
  // if you set link in your items, it will be appear the download link.
  link = string; // for file uploader download link
  header = HttpHeaders; // for set headser in download link (Authorozation, contentType, ...)
  downloadLinkTitle = string;
}

export class FormBuilderSelectOption {
  name: any;
  value: any;
}

```

####

if you wants to upload file and show download link of that in form builder, you had to set type in 'file' and set
isFile 'true', also you have this props for using that:

| name              | type        | description                                     |
|-------------------|-------------|-------------------------------------------------|
| link              | string      | link for download file                          |
| header            | HttpHeaders | for set headers                                 |
| downloadLinkTitle | string      | the string that will be appear for user in Html |
