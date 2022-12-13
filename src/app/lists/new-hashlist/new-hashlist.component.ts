import { Component, OnInit, ChangeDetectionStrategy ,ChangeDetectorRef  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js'; //ToDo Change to a Common Module
// import * as $ from "jquery"; //Fixes Test error but affects

import { faMagnifyingGlass, faUpload } from '@fortawesome/free-solid-svg-icons';

import { ShowHideTypeFile } from '../../shared/utils/forms';
import { fileSizeValue, validateFileExt } from '../../shared/utils/util';

import { ListsService } from '../../service/lists/hashlist.service';
import { HashtypeService } from 'src/app/service/hashtype.service';
import { AccessGroupsService } from '../../service/accessgroups.service';
import { UploadTUSService } from '../../service/files/files_tus.service';

import { AccessGroup } from '../../models/access-group';
import { UploadFileTUS } from '../../models/files';


@Component({
  selector: 'app-new-hashlist',
  templateUrl: './new-hashlist.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewHashlistComponent implements OnInit {
  isLoading = false;
  faMagnifyingGlass=faMagnifyingGlass;

  // Form custom settings
  signupForm: FormGroup;
  ShowHideTypeFile = ShowHideTypeFile;
  radio=true;
  hashcatbrain: string;

  // accessgroup: AccessGroup; //Use models when data structure is reliable
  accessgroup: any[]

  constructor(private hlService: ListsService,
     private _changeDetectorRef: ChangeDetectorRef,
     private hashtypeService: HashtypeService,
     private accessgroupService: AccessGroupsService,
     private router: Router,
     private uploadService:UploadTUSService) { }

  ngOnInit(): void {

    this.accessgroupService.getAccessGroups().subscribe((agroups: any) => {
      this.accessgroup = agroups.values;
    });

    this.signupForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'hashTypeId': new FormControl('', [Validators.required]),
      'format': new FormControl(null),
      'separator': new FormControl(null || ';'),
      'isSalted': new FormControl(false),
      'isHexSalt': new FormControl(false),
      'accessGroupId': new FormControl(null, [Validators.required]),
      'useBrain': new FormControl(false),
      'brainFeatures': new FormControl(null || '3'),
      'notes': new FormControl(''),
      "sourceType": new FormControl('paste'),
      "sourceData": new FormControl(''),
      'hashCount': new FormControl(0),
      'cracked': new FormControl(0),
      'isArchived': new FormControl(false),
      'isSecret': new FormControl(true),
    });

  }

  ngAfterViewInit() {

    this.uploadProgress = this.uploadService.uploadProgress; // TUS upload progress

    this.hashtypeService.getHashTypes().subscribe((htypes: any) => {
      var self = this;
      var response = htypes.values;
      ($("#hashtype") as any).selectize({
        plugins: ['remove_button'],
        valueField: "hashTypeId",
        placeholder: "Search hashtype...",
        labelField: "description",
        searchField: ["description"],
        loadingClass: 'Loading..',
        highlight: true,
        onChange: function (value) {
            self.OnChangeValue(value); // We need to overide DOM event, Angular vs Jquery
        },
        render: {
          option: function (item, escape) {
            return '<div  class="hashtype_selectize">' + escape(item.hashTypeId) + ' -  ' + escape(item.description) + '</div>';
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
    this.signupForm.patchValue({
      hashTypeId: value
    });
    this._changeDetectorRef.detectChanges();
  }
  // TUS File Uload
  uploadProgress: Observable<UploadFileTUS[]>;
  filenames: string[] = [];

  onuploadFile(event: FileList) {
    // tslint:disable-next-line:prefer-for-of
    const file = event.item(0)
    const filename = `${new Date().getTime()}_${file.name}`;
      console.log("echo")
      console.log(`Uploading ${file.name} with size ${file.size} and type ${file.type}`);
      this.uploadService.uploadFile(file, file.name);
  }

  // New File Upload
  task: any;
  isHovering: boolean;
  faUpload=faUpload;

  percent$: Observable<number>;
  url$: Observable<string>;

  state$: Observable<string>;
  bytes$: Observable<number[]> ;

  // startUpload(event: FileList): any {
  //   console.log(event)
  //   const file = event.item(0)
  //   const loc = `/test/${new Date().getTime()}_${file.name}`;

  //   // this.task = this.storage.upload(loc, file)

  //   this.state$ = this.task.snapshotChanges().map(task => task.bytesTransferred === task.totalBytes ? 'success' : task.state)
  //   this.bytes$ = this.task.snapshotChanges().map(task => [task.bytesTransferred, task.totalBytes])

  //   this.percent$ = this.task.percentageChanges()

  // }

  toggleHover(event) {
    this.isHovering = event;
    console.log(event)
  }

  cancel() {
    this.task.cancel()
  }

  // Old File Upload

  fileSizeValue = fileSizeValue;

  validateFileExt = validateFileExt;

  fileGroup: number;
  fileToUpload: File | null = null;
  fileSize: any;
  fileName: any;

    handleFileInput(event: any) {
      this.fileToUpload = event.target.files[0];
      this.fileSize = this.fileToUpload.size;
      this.fileName = this.fileToUpload.name;
      $('.fileuploadspan').text(fileSizeValue(this.fileToUpload.size));
    }

  // Create HashList

  onSubmit(): void{
      if (this.signupForm.valid) {
      console.log(this.signupForm.value);

      this.isLoading = true;

      this.hlService.createHashlist(this.signupForm.value).subscribe((hl: any) => {
        this.isLoading = false;
        Swal.fire({
          title: "Good job!",
          text: "New HashList created!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/lists/hashlist']);
      },
      errorMessage => {
        // check error status code is 500, if so, do some action
        Swal.fire({
          title: "Oppss! Error",
          text: "HashList was not created, please try again!",
          icon: "warning",
          showConfirmButton: true
        });
        this.ngOnInit();
      }
    );
    this.signupForm.reset(); // success, we reset form
    }
  }
}
