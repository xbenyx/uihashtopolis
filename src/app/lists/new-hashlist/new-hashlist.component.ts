import { Component, OnInit, ChangeDetectionStrategy ,ChangeDetectorRef  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ShowHideTypeFile } from '../../shared/utils/forms';
import { fileSizeValue, validateFileExt } from '../../shared/utils/util';
import { ListsService } from '../../service/lists/hashlist.service';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


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

  // Check Filesize

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

  constructor(private hlService: ListsService, private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'hashlistName': new FormControl(null),
      'hashTypeId': new FormControl(null , [Validators.required]),
      'format': new FormControl(null || '3'),
      'saltSeparator': new FormControl(null || ';'),
      'isSalted': new FormControl(false),
      'hexSalt': new FormControl(false),
      'accessGroupId': new FormControl(null || 1),
      'data': new FormControl(null),
      'isSecret': new FormControl(true),
      'brainId': new FormControl(false),
      'brainFeatures': new FormControl(null || '3'),
    });

  }

  ngAfterViewInit() {
    this.cus_selectize('hashtype');
 }

//  private selectize: any;

//  private onChangeCallback: (_: any) => {};

 OnChangeValue(value){
  this.signupForm.patchValue({
    hashTypeId: value
  });
  this._changeDetectorRef.detectChanges();
 }

//  private selectize: any;

//  private onChangeCallback: (_: any) => {};

// 	onSelectizeValueChange($event: any): void {
// 		// In some cases this gets called before registerOnChange.
// 		if (this.onChangeCallback) {
// 			this.onChangeCallback(this.selectize.getValue());
// 		}
// 	}

  cus_selectize(s_id) {
    const thisApp = this;
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
          thisApp.OnChangeValue(value);
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

  onSubmit(): void{
    // if (this.signupForm.valid) {
    console.log(this.signupForm.value);

    this.isLoading = true;

    this.hlService.createHashlist(this.signupForm.value).subscribe((hl: any) => {
      this.isLoading = false;
      // console.log(user);
    });

    this.signupForm.reset();
    }
  // }



}
