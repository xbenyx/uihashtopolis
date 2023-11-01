import { FormBuilder, FormGroup, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription, combineLatest, forkJoin, map, switchMap, takeUntil } from 'rxjs';
import { MetadataService } from 'src/app/core/_services/metadata.service';
import { GlobalService } from 'src/app/core/_services/main.service';
import { ChangeDetectorRef } from '@angular/core';

/**
 * This component renders a dynamic form based on the provided form metadata.
 */
@Component({
  selector: 'app-dynamic-form',
  template: `
<app-page-subtitle [subtitle]="subtitle"></app-page-subtitle>
<grid-main [class]="'width:100%;'" [centered]="true">
  <form [formGroup]="form" (ngSubmit)="onSubmit()">
    <div *ngFor="let field of formMetadata">
      <ng-container *ngIf="field.isTitle">
        <h5>{{ field.label }}</h5>
      </ng-container>
      <ng-container *ngIf="!field.isTitle">
        <div class="form-group">
          <div class="form-outline form-input-custom">
            <label [class.requiredak]="field.requiredasterisk" class="form-label" [for]="field.name">{{ field.label }}</label>
            <fa-icon
                  placement="bottom"
                  ngbTooltip="{{field.tooltip}}"
                  container="body"
                  [icon]="faInfoCircle"
                  aria-hidden="true"
                  class="gray-light-ico display-col"
                  *ngIf="field.tooltip"
            ></fa-icon>
            <ng-container [ngSwitch]="field.type">
              <td *ngSwitchCase="'number'">
                <input class="form-control" type="number" [formControlName]="field.name">
              </td>
              <div *ngSwitchCase="'text'">
                <input class="form-control" [type]="field.type" [formControlName]="field.name">
              </div>
              <div *ngSwitchCase="'email'">
                <input class="form-control" [type]="field.type" [formControlName]="field.name">
              </div>
              <div *ngSwitchCase="'select'">
                <select class="form-select" [formControlName]="field.name">
                  <option *ngFor="let option of field.selectOptions" [ngValue]="option.value">{{ option.label }}</option>
                </select>
              </div>
              <div *ngSwitchCase="'selectd'">
              <select class="form-select" [formControlName]="field.name">
                <ng-container *ngIf="isLoadingSelect; else options">
                  <option disabled>Loading...</option>
                </ng-container>
                <ng-template #options>
                  <option [ngValue]="null">Please Select an Option</option>
                  <option *ngFor="let option of field.selectOptions$" [ngValue]="option.id">{{ option.name }}</option>
                </ng-template>
              </select>
              </div>
              <td *ngSwitchCase="'checkbox'" class="form-check form-switch">
                <input type="checkbox" [formControlName]="field.name" [id]="field.name" class="form-check-input">
              </td>
            </ng-container>
          </div>
        </div>
      </ng-container>
    </div>
    <grid-buttons>
      <button-submit name="Cancel" [disabled]="false" type="cancel" *ngIf="isCreateMode"></button-submit>
      <button-submit name="Delete" [disabled]="false" type="delete" *ngIf="!isCreateMode" (click)="onDelete()">Delete</button-submit>
      <button-submit [name]="buttonText" [disabled]="!formIsValid()"></button-submit>
    </grid-buttons>
  </form>
</grid-main>
  `,
})
export class DynamicFormComponent implements OnInit, AfterViewInit, OnDestroy {
  /**
   * FontAwesome icon for providing additional information in form fields.
   */
  faInfoCircle = faInfoCircle;

  /**
   * The subtitle to display.
   * @type {string}
   */
  @Input() subtitle: string;

  /**
   * An array of form field metadata that describes the form structure.
   */
  @Input() formMetadata: any[] = [];

  /**
   * Additional CSS class for labels.
   */
  @Input() labelclass?: any;

  /**
   * Initial values for form fields (optional). If not provided, an empty object is used as the default.
   */
  @Input() formValues: any = {};

  /**
   * The Angular FormGroup that represents the dynamic form.
   */
  @Input() form: FormGroup;

  /**
   * Indicates whether the form is in "create" mode or "update" mode.
   * When true, it's in "create" mode, and when false, it's in "update" mode.
  */
  @Input() isCreateMode: boolean;

  /**
   * The text to display on the "Create" or "Update" button.
   */
  @Input() buttonText: string;

  // Create an Output event to emit the form values on submission
  @Output() formSubmit: EventEmitter<any> = new EventEmitter();

  // Create an Output event to emit the delete action
  @Output() deleteAction: EventEmitter<void> = new EventEmitter();

  private destroy$ = new Subject<void>(); // Create a destroy$ subject

  constructor(private fb: FormBuilder, private gs: GlobalService, private cd: ChangeDetectorRef) {}

  /**
   * Initializes the form with controls and their initial values.
   */
  ngOnInit() {
    // Handle other fields and initialize the form controls
    const controlsConfig = {};

    for (const field of this.formMetadata) {
      if (!field.isTitle) {
        const fieldName = field.name;
        const validators: ValidatorFn[] = field.validators ? field.validators : [];

        let initialValue = this.formValues[fieldName] || '';

        if (this.isCreateMode && field.defaultValue !== undefined) {
          initialValue = field.defaultValue;
        }
        if (!this.isCreateMode && field.disabled) {
          controlsConfig[fieldName] = { value: initialValue, disabled: true };
        } else {
          controlsConfig[fieldName] = new FormControl(initialValue, validators);
        }
      }
    }
    this.form = this.fb.group(controlsConfig);
  }

  private selectOptionsSubscription: Subscription;
  isLoadingSelect: boolean = true;

  ngAfterViewInit() {
    // Check if there are any "select" type fields with "selectOptions$"
    const selectFields = this.formMetadata.filter(
      (field) => field.type === 'selectd' && field.selectOptions$
    );

    if (selectFields.length > 0) {
      // Handle logic for select fields with selectOptions$ after the view is initialized
      selectFields.forEach((field) => {
        // Fetch the select options dynamically here
        this.selectOptionsSubscription = this.gs.getAll(field.selectEndpoint$).subscribe((options) => {
          field.selectOptions$ = options.values;
          this.isLoadingSelect = false;
          // Optionally, update the form control value if needed
          const control = this.form.get(field.name);

          // // Check if there are options available
          if (control && options.values && options.values.length > 0 && !this.isCreateMode) {
            // Set the initial selected value (e.g., the first option)
            const initialSelectedValue = options.values[0].value;
            control.setValue(initialSelectedValue);
          }

          // Trigger change detection to prevent ExpressionChangedAfterItHasBeenCheckedError
          this.cd.detectChanges();
        });
      });
    }
  }

  /**
   * Checks if the form is valid.
   * @returns {boolean} True if the form is valid, false otherwise.
  */
  formIsValid(): boolean {
    return this.form.valid;
  }

  /**
   * Handles the form submission.
   * Emits the form values to the parent component if the form is valid.
   */
  onSubmit() {
    if (this.form.valid) {
      // Emit the form values to the parent component
      this.formSubmit.emit(this.form.value);
    }
  }

  /**
   * Handles the delete action.
   * Emits the delete action to the parent component when the "Delete" button is clicked.
  */
  onDelete(){
    this.deleteAction.emit();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
