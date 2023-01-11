import { Component, OnInit, ChangeDetectionStrategy ,ChangeDetectorRef  } from '@angular/core';
import { faFile, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { PreTasksService } from 'src/app/core/_services/tasks/pretasks.sevice';
import { SuperTasksService } from 'src/app/core/_services/tasks/supertasks.sevice';

@Component({
  selector: 'app-new-supertasks',
  templateUrl: './new-supertasks.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewSupertasksComponent implements OnInit {
  isLoading = false;
  faFile=faFile;
  faMagnifyingGlass=faMagnifyingGlass;

  constructor(
    private pretasksService: PreTasksService,
    private supertaskService: SuperTasksService,
    private router: Router,
    private _changeDetectorRef: ChangeDetectorRef,
  ) { }

  createForm: FormGroup;
  private maxResults = environment.config.prodApiMaxResults
  formArr: FormArray;

  ngOnInit(): void {


    this.createForm = new FormGroup({
      supertaskName: new FormControl(''),
      pretasks: new FormControl(''),
    });

    let params = {'maxResults': this.maxResults}

    this.pretasksService.getAllPretasks(params).subscribe((tasks: any) => {
      var self = this;
      var response = tasks.values;
      ($("#preTasks") as any).selectize({
        maxItems: null,
        valueField: "pretaskId",
        placeholder: "Search task...",
        labelField: "taskName",
        searchField: ["taskName"],
        loadingClass: 'Loading..',
        highlight: true,
        onChange: function (value) {
            self.OnChangeValue(value); // We need to overide DOM event, Angular vs Jquery
        },
        render: {
          option: function (item, escape) {
            return '<div  class="hashtype_selectize">' + escape(item.pretaskId) + ' -  ' + escape(item.taskName) + '</div>';
          },
        },
        onInitialize: function(){
          var selectize = this;
            selectize.addOption(response); // This is will add to option
            var selected_items = [];
            $.each(response, function( i, obj) {
                selected_items.push(obj.id);
            });
            selectize.setValue(selected_items); //this will set option values as default
          }
          });
        });
  }

  OnChangeValue(value){
    let formArr = new FormArray([]);
    for (let val of value) {
      formArr.push(
        new FormControl(+val)
      );
    }
    this.createForm = new FormGroup({
      supertaskName: new FormControl('', [Validators.required]),
      pretasks: formArr
    });
    this._changeDetectorRef.detectChanges();
  }

  onSubmit(){
    if (this.createForm.valid) {

      this.isLoading = true;

      this.supertaskService.createSupertask(this.createForm.value).subscribe((hasht: any) => {
        const response = hasht;
        this.isLoading = false;
          Swal.fire({
            title: "Good job!",
            text: "New Supertask created!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
          this.createForm.reset(); // success, we reset form
          this.router.navigate(['tasks/supertasks']);
        },
        errorMessage => {
          // check error status code is 500, if so, do some action
          Swal.fire({
            title: "Error!",
            text: "Supertask was not created, please try again!",
            icon: "warning",
            showConfirmButton: true
          });
        }
      );
    }
  }

}


// user = new FormGroup({
//   name: new FormControl(''),
//   skills: new FormArray([])
// });
