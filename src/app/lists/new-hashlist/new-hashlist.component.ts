import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ShowHideTypeFile } from '../../shared/utils/forms';
import { fileSizeValue, validateFileExt } from '../../shared/utils/util';
import { ListsService } from '../../service/lists/hashlist.service';


@Component({
  selector: 'app-new-hashlist',
  templateUrl: './new-hashlist.component.html'
})
export class NewHashlistComponent implements OnInit {
  isLoading = false;

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

  constructor(private hlService: ListsService) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'hashlistName': new FormControl(null),
      'hashTypeId': new FormControl(null),
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

  onSubmit(): void{
    if (this.signupForm.valid) {
    console.log(this.signupForm.value);

    this.isLoading = true;

    this.hlService.createHashlist(this.signupForm.value).subscribe((hl: any) => {
      this.isLoading = false;
      // console.log(user);
    });

    this.signupForm.reset();
    }
  }



}
