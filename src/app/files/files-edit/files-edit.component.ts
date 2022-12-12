import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faCalendar,faLock, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';

import { FilesService } from '../../service/files/files.service';
import { AccessGroupsService } from '../../service/accessgroups.service';
import { Configuration } from '../../service/configuration';

import { AccessGroup } from '../../models/access-group';
import { Filetype } from '../../models/files';


@Component({
  selector: 'app-files-edit',
  templateUrl: './files-edit.component.html'
})
export class FilesEditComponent implements OnInit {
  isLoading = false;

  filterType: number
  whichView: string;

  // accessgroup: AccessGroup; //Use models when data structure is reliable
  accessgroup: any[]
  allfiles: any[]

  constructor(private filesService: FilesService,
    private accessgroupService:AccessGroupsService,
    private route:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      switch (data['kind']) {

        case 'wordlist':
          this.whichView = 'wordlist';
        break;

        case 'rules':
          this.whichView = 'rules';
        break;

        case 'other':
          this.whichView = 'other';
        break;

      }

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

}
