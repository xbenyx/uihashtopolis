import { Component, OnInit, ChangeDetectionStrategy ,ChangeDetectorRef  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ShowHideTypeFile } from '../../shared/utils/forms';
import { fileSizeValue, validateFileExt } from '../../shared/utils/util';
import { ListsService } from '../../service/lists/hashlist.service';
import { faMagnifyingGlass, faUpload } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { HashtypeService } from 'src/app/service/hashtype.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'; //ToDo Change to a Common Module
// import * as $ from "jquery"; //Fixes Test error but affects

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

  constructor(private hlService: ListsService,
     private _changeDetectorRef: ChangeDetectorRef,
     private hashtypeService: HashtypeService) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'hashTypeId': new FormControl(null , [Validators.required]),
      'format': new FormControl(parseInt(null) || 0),
      'separator': new FormControl(null || ';'),
      'isSalted': new FormControl(false),
      'isHexSalt': new FormControl(false),
      'accessGroupId': new FormControl('', [Validators.required]),
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
    this.cus_selectize('hashtype');
 }

  OnChangeValue(value){
    this.signupForm.patchValue({
      hashTypeId: value
    });
    this._changeDetectorRef.detectChanges();
  }

  public htypes: {hashTypeId: number, description: string, isSalted: number, isSlowHash: number, isEdit: false}[] = [];

  cus_selectize(s_id) {
    var self = this;
    ($("#" + s_id) as any).selectize({
      plugins: ['remove_button'],
      valueField: "hashTypeId",
      placeholder: "Search hashtype...",
      labelField: "description",
      searchField: ["description"],
      loadingClass: 'Loading..',
      highlight: true,
      // create: true, // We could create new hashtypes on the go
      onChange: function (value) {
          self.OnChangeValue(value); // We need to overide DOM event
          console.log(value);
      },
      render: {
        option: function (item, escape) {
          return '<div  class="hashtype_selectize">' + escape(item.hashTypeId) + ' -  ' + escape(item.description) + '</div>';
        },
      },
      load: function (query, callback) {
        if (!query.length) return callback();
        this.clearCache();
        // this.hashtypeService.getHashTypes().subscribe((hasht: any) => {
        //   this.htypes = hasht.values;
        //   console.log(this.htypes);
        //   callback(this.htypes);
        // });
        $.ajax({
          url: 'http://localhost:3000/hashtype',
          type: "GET",
          error: function () {
            callback();
            console.log("Error");
          },
          success: function (res) {
            if (res) {
              // var this_result = JSON.parse(res); // If its not returning json
              var this_result = res;
              callback(this_result);
            }
          },
        });
      },
      onInitialize: function(){
        var selectize = this;
        // this.hashtypeService.getHashTypes().subscribe((hasht: any) => {
        //   console.log(hasht);
        // });
        $.get("http://localhost:3000/hashtype", function( data ) {
            selectize.addOption(data); // This is will add to option
            var selected_items = [];
            $.each(data, function( i, obj) {
                selected_items.push(obj.id);
            });
            selectize.setValue(selected_items); //this will set option values as default
        });
    }
    });
  }

  // New File Upload
  task: any;
  isHovering: boolean;
  faUpload=faUpload;

  percent$: Observable<number>;
  url$: Observable<string>;

  state$: Observable<string>;
  bytes$: Observable<number[]> ;

  startUpload(event: FileList): any {
    console.log(event)
    const file = event.item(0)
    const loc = `/test/${new Date().getTime()}_${file.name}`;

    // this.task = this.storage.upload(loc, file)

    this.state$ = this.task.snapshotChanges().map(task => task.bytesTransferred === task.totalBytes ? 'success' : task.state)
    this.bytes$ = this.task.snapshotChanges().map(task => [task.bytesTransferred, task.totalBytes])

    this.percent$ = this.task.percentageChanges()

  }

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
      },
      errorMessage => {
        // check error status code is 500, if so, do some action
        Swal.fire({
          title: "Error!",
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
