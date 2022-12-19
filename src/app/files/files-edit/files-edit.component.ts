import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js'; //ToDo Change to a Common Module

import { FilesService } from '../../core/_services/files/files.service';
import { AccessGroupsService } from '../../core/_services/accessgroups.service';
import { Configuration } from '../../core/_services/configuration';

import { AccessGroup } from '../../core/_models/access-group';
import { Filetype } from '../../core/_models/files';


@Component({
  selector: 'app-files-edit',
  templateUrl: './files-edit.component.html'
})
export class FilesEditComponent implements OnInit {
  isLoading = false;

  filterType: number
  whichView: string;

  // accessgroup: AccessGroup; //Use models when data structure is reliable
  signupForm: FormGroup;
  accessgroup: any[]
  allfiles: any[]
  filetype: any[]

  constructor(private filesService: FilesService,
    private accessgroupService:AccessGroupsService,
    private route:ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {

    this.signupForm = new FormGroup({
      'fileId': new FormControl(''),
      'filename': new FormControl('', [Validators.required, Validators.minLength(1)]),
      'fileType': new FormControl(null),
      'accessGroupId': new FormControl(null)
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

      const id = +this.route.snapshot.params['id'];

      this.accessgroupService.getAccessGroups().subscribe((agroups: any) => {
        this.accessgroup = agroups.values;
      });

      this.filesService.getFile(id).subscribe((files: any) => {
        this.allfiles = files;
        this.isLoading = false;
      });

    });
  }

  onSubmit(): void{
    if (this.signupForm.valid) {
    console.log(this.signupForm.value);

    this.isLoading = true;

    this.filesService.updateFile(this.signupForm.value).subscribe((hl: any) => {
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
  this.signupForm.reset(); // success, we reset form
  }
}

}
