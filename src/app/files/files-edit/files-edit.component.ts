import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from 'src/app/core/_services/users/users.service';
import { FilesService } from '../../core/_services/files/files.service';
import { GlobalService } from 'src/app/core/_services/main.service';
import { PageTitle } from 'src/app/core/_decorators/autotitle';
import { SERV } from '../../core/_services/main.config';
import { Filetype } from '../../core/_models/files';

@Component({
  selector: 'app-files-edit',
  templateUrl: './files-edit.component.html'
})
@PageTitle(['Edit File'])
export class FilesEditComponent implements OnInit {

  editMode = false;
  editedFileIndex: number;
  editedFile: any // Change to Model

  isLoading = false;

  filterType: number
  whichView: string;

  // accessgroup: AccessGroup; //Use models when data structure is reliable
  updateForm: FormGroup;
  accessgroup: any[]
  allfiles: any[]
  filetype: any[]

  constructor(
    private filesService: FilesService,
    private route:ActivatedRoute,
    private users: UsersService,
    private gs: GlobalService,
    private router: Router
    ) { }

  ngOnInit(): void {

    this.setAccessPermissions();

    this.route.params
    .subscribe(
      (params: Params) => {
        this.editedFileIndex = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );

    this.updateForm = new FormGroup({
      'fileId': new FormControl({value: '', disabled: true}),
      'updateData': new FormGroup({
        'filename': new FormControl('', [Validators.required, Validators.minLength(1)]),
        'fileType': new FormControl(null),
        'accessGroupId': new FormControl(null)
      })
    });

    this.route.data.subscribe(data => {
      switch (data['kind']) {

        case 'wordlist':
          this.whichView = 'wordlist-edit';
        break;

        case 'rules':
          this.whichView = 'rules-edit';
        break;

        case 'other':
          this.whichView = 'other-edit';
        break;

      }

      this.filetype = [{fileType: 0, fileName: 'Wordlist'},{fileType: 1, fileName: 'Rules'},{fileType: 2, fileName: 'Other'}];

      this.gs.getAll(SERV.ACCESS_GROUPS).subscribe((agroups: any) => {
        this.accessgroup = agroups.values;
      });

      this.filesService.getFile(this.editedFileIndex).subscribe((files: any) => {
        this.allfiles = files;
        this.isLoading = false;
      });

    });
  }
  // Set permissions
  manageFileAccess: any;

  setAccessPermissions(){
    this.users.getUser(4,{'expand':'globalPermissionGroup'}).subscribe((perm: any) => {
        this.manageFileAccess = perm.globalPermissionGroup.permissions.manageFileAccess;
    });
  }


  onSubmit(): void{
    if (this.updateForm.valid && (this.manageFileAccess || typeof this.manageFileAccess == 'undefined')) {

    this.isLoading = true;

    this.filesService.updateFile(this.updateForm.value).subscribe((hl: any) => {
      this.isLoading = false;
      Swal.fire({
        title: "Great!",
        text: "File updated!",
        icon: "success",
        showConfirmButton: false,
        timer: 1500
      });
      this.route.data.subscribe(data => {
        switch (data['kind']) {

          case 'wordlist-edit':
            this.whichView = 'wordlist';
          break;

          case 'rules-edit':
            this.whichView = 'rules';
          break;

          case 'other-edit':
            this.whichView = 'other';
          break;

        }
      this.router.navigate(['../files/'+this.whichView+'']);
      })
    },
    errorMessage => {
      // check error status code is 500, if so, do some action
      Swal.fire({
        title: "Oppss! Error",
        text: "File was not updated, please try again!",
        icon: "warning",
        showConfirmButton: true
      });
      this.ngOnInit();
    }
  );
  this.updateForm.reset(); // success, we reset form
  }else{
    Swal.fire({
      title: "ACTION DENIED",
      text: "Please contact your Administrator.",
      icon: "error",
      showConfirmButton: false,
      timer: 2000
    })
  }
}

private initForm() {
  this.isLoading = true;
  if (this.editMode) {
  this.filesService.getFile(this.editedFileIndex).subscribe((result)=>{
    this.updateForm = new FormGroup({
      'fileId': new FormControl(result['fileId'], Validators.required),
      'updateData': new FormGroup({
        'filename': new FormControl(result['filename'], Validators.required),
        'fileType': new FormControl(result['fileType'], Validators.required),
        'accessGroupId': new FormControl(result['accessGroupId'], Validators.required),
      })
    });
    this.isLoading = false;
  });
 }
}

}
