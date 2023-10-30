import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AutoTitleService } from 'src/app/core/_services/shared/autotitle.service';
import { UnsubscribeService } from 'src/app/core/_services/unsubscribe.service';
import { AlertService } from 'src/app/core/_services/shared/alert.service';
import { MetadataService } from 'src/app/core/_services/metadata.service';
import { GlobalService } from 'src/app/core/_services/main.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form',
  template: `
    <app-dynamic-form [subtitle]='title' *ngIf="isloaded" [formMetadata]="formMetadata" [formValues]="formValues" [form]="form" [isCreateMode]="isCreate" [buttonText]="isCreate ? 'Create' : 'Update'" (formSubmit)="onFormSubmit($event)" (deleteAction)="onDeleteAction()"></app-dynamic-form>
  `,
})
/**
 * Component for managing forms, supporting both create and edit modes.
 */
export class FormComponent implements OnInit, OnDestroy {

  // Metadata Text, titles, subtitles, forms, and API path
  globalMetadata: any[] = [];
  apiPath: string;

  // Logic when form is in create or edit mode
  type: string;
  isloaded= false;
  isCreate: boolean;
  editedIndex: number;

  // Form
  title: string;
  form: FormGroup;
  customform: boolean;
  formMetadata: any[] = [];
  formValues: any[] = [];

  // Subscription for managing asynchronous data retrieval
  private mySubscription: Subscription;

  /**
   * Constructor for the FormComponent.
   * @param unsubscribeService - The UnsubscribeService for managing subscriptions.
   * @param metadataService - The MetadataService for accessing form metadata.
   * @param titleService - The AutoTitleService for setting titles.
   * @param route - The ActivatedRoute for retrieving route data.
   * @param alert - The AlertService for displaying alerts.
   * @param gs - The GlobalService for handling global operations.
   * @param router - The Angular Router for navigation.
  */
  constructor(
    private unsubscribeService: UnsubscribeService,
    private metadataService: MetadataService,
    private titleService: AutoTitleService,
    private route: ActivatedRoute,
    private alert: AlertService,
    private gs: GlobalService,
    private router: Router
  ) {
    // Subscribe to route data to initialize component data
    this.route.data.subscribe((data: { kind: string, path: string, type: string }) => {
      const formKind = data.kind;
      this.apiPath = data.path; // Get the API path from route data
      this.type = data.type;
      this.isCreate = (this.type === 'create'? true:false);

      // Load metadata and form information
      if(this.type === 'edit'){
        this.getIndex();
        this.loadEdit(); // Load data for editing
      }else{
        this.isloaded = true
      }

      // Load metadata and form information
      this.globalMetadata = this.metadataService.getInfoMetadata(formKind+'Info')[0];
      this.formMetadata = this.metadataService.getFormMetadata(formKind);
      this.title = this.globalMetadata['title'];
      this.customform = this.globalMetadata['customform'];
      titleService.set([this.title]);
    });
    // Add this.mySubscription to UnsubscribeService
    this.unsubscribeService.add(this.mySubscription);
  }

  /**
   * Loads data for editing a form.
  */
  getIndex() {
    this.route.params.subscribe((params: Params) => {
      this.editedIndex = +params['id'];
    });
  }

  /**
   * Loads data for editing a form.
   */
  loadEdit() {
    this.route.params.subscribe((params: Params) => {
      this.editedIndex = +params['id'];
    });

    // Fetch data from the API for editing
    this.gs.get(this.apiPath, this.editedIndex).subscribe((result) => {
      this.formValues = result;
      this.isloaded = true; // Data is loaded and ready for form rendering
      console.log(this.formValues);
    });
  }

  /**
   * Angular lifecycle hook: ngOnInit
   */
  ngOnInit(): void {
    // If in "edit" mode, load data for editing
    if (this.type === 'edit') {
      this.loadEdit();
    }
  }

  /**
   * Angular lifecycle hook: ngOnDestroy
   * Unsubscribe from all subscriptions to prevent memory leaks.
   */
  ngOnDestroy(): void {
    this.unsubscribeService.unsubscribeAll();
  }

  /**
   * Handles the submission of the form.
   * @param formValues - The values submitted from the form.
  */
  onFormSubmit(formValues: any) {
    if(this.customform){
      this.onCustomForm(formValues);
    }
    console.log(formValues)
    if (this.type === 'create') {
      // Create mode: Submit form data for creating a new item
      this.mySubscription = this.gs.create(this.apiPath, formValues).subscribe(() => {
        this.alert.okAlert(this.globalMetadata['submitok'], '');
        this.router.navigate([this.globalMetadata['submitokredirect']]);
      });
    } else {
      // Update mode: Submit form data for updating an existing item
      this.mySubscription = this.gs.update(this.apiPath, this.editedIndex, formValues).subscribe(() => {
        this.alert.okAlert(this.globalMetadata['submitok'], '');
        this.router.navigate([this.globalMetadata['submitokredirect']]);
      });
    }
  }

  /**
   * Modifies the form values as needed for custom form submission.
   * @param formValues - The form values to be modified.
   * @returns The modified form values.
   */
  onCustomForm(formValues: any) {
    // Check the formMetadata for fields with 'replacevalue' property
    this.getIndex();
    for (const field of this.formMetadata) {
      if (field.replacevalue) {
        // Replace the value with the 'editedIndex'
        formValues[field.name] = this.editedIndex;
      }
      // Add custom logic to modify formValues as needed
    }

    // Return the modified formValues
    return formValues;
  }

  onDeleteAction(){
    if(this.globalMetadata['deltitle']){
      this.getIndex();
    }
    this.alert.deleteConfirmation('',this.globalMetadata['deltitle']).then((confirmed) => {
      if (confirmed) {
        // Deletion
        this.gs.delete(this.apiPath, this.editedIndex).subscribe(() => {
          // Successful deletion
          this.alert.okAlert(this.globalMetadata['delsubmitok'], '');
          this.router.navigate([this.globalMetadata['delsubmitokredirect']]);
        });
      } else {
        // Handle cancellation
        this.alert.okAlert(this.globalMetadata['delsubmitcancel'],'');
      }
    });
  }

}
