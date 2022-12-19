import { faEdit, faTrash, faHomeAlt, faPlus, faUpload, faFileImport, faDownload, faPaperclip, faLink, faLock} from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js'; //ToDo Change to a Common Module
import { Subject, Observable } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

import { fileSizeValue, validateFileExt } from '../shared/utils/util';

import { FilesService } from '../core/_services/files/files.service';
import { UploadTUSService } from '../core/_services/files/files_tus.service';
import { AccessGroupsService } from '../core/_services/accessgroups.service';
import { Configuration } from '../core/_services/configuration';

import { AccessGroup } from '../core/_models/access-group';
import { Filetype } from '../core/_models/files';
import { UploadFileTUS } from '../core/_models/files';


@Component({
  selector: 'app-files',
  templateUrl: './files.component.html'
})

export class FilesComponent implements OnInit {
  public isCollapsed = true;
  faTrash=faTrash;
  faHome=faHomeAlt;
  faPlus=faPlus;
  faUpload=faUpload;
  faFileImport=faFileImport;
  faDownload=faDownload;
  faPaperclip=faPaperclip;
  faLink=faLink;
  faLock=faLock;
  faEdit=faEdit;

  public allfiles: {
    fileId: number,
    filename: string,
    size: number,
    isSecret: number,
    fileType: number,
    accessGroupId: number,
    lineCount:number
    accessGroup: {
      accessGroupId: number,
      groupName: string
    }
  }[] = [];

  constructor(
    private filesService: FilesService,
    private http: HttpClient,
    private accessgroupService:AccessGroupsService,
    private route:ActivatedRoute,
    private uploadService:UploadTUSService) { }

// accessgroup: AccessGroup; //Use models when data structure is reliable
  accessgroup: any[]

// Render Table with Datatables directive
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};

  filterType: number
  whichView: string;

  private maxResults = Configuration.MAX_RESULTS

  ngOnInit(): void {

    this.route.data.subscribe(data => {
      switch (data['kind']) {

        case 'wordlist':
          this.filterType = 0
          this.whichView = 'wordlist';
        break;

        case 'rules':
          this.filterType = 1
          this.whichView = 'rules';
        break;

        case 'other':
          this.filterType = 2
          this.whichView = 'other';
        break;

      }
      let params = {'maxResults': this.maxResults, 'expand': 'accessGroup', 'filter': 'fileType='+this.filterType+''}

      this.accessgroupService.getAccessGroups().subscribe((agroups: any) => {
        this.accessgroup = agroups.values;
      });

      this.filesService.getFiles(params).subscribe((files: any) => {
        this.allfiles = files.values;
        this.dtTrigger.next(void 0);
      });

      this.dtOptions = {
        dom: 'Bfrtip',
        pageLength: 10,
        stateSave: true,
        select: true,
        buttons: ['copy', 'excel', 'csv', 'edit']
      };

      this.uploadProgress = this.uploadService.uploadProgress; //Uploading File using tus protocol

    });

  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      setTimeout(() => {
        this.dtTrigger['new'].next();
      });
    });
  }

  // Uploading file
  uploadProgress: Observable<UploadFileTUS[]>;
  filenames: string[] = [];

  isHovering: boolean;

  toggleHover(event) {
    this.isHovering = event;
    console.log(event)
  }

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

  onuploadFile(files: FileList) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < files.length; i++) {
      this.filenames.push(files[i].name);
      console.log(`Uploading ${files[i].name} with size ${files[i].size} and type ${files[i].type}`);
      this.uploadService.uploadFile(files[i], files[i].name);
    }
  }

  deleteFile(id: number){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, it can not be recovered!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
    .then((result) => {
      if (result.isConfirmed) {
        this.filesService.deleteFile(id).subscribe(() => {
          Swal.fire(
            "File has been deleted!",
            {
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
          this.ngOnInit();
          this.rerender();  // rerender datatables
        });
      } else {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'No worries, your File is safe!',
          'error'
        )
      }
    });
  }

  // Add unsubscribe to detect changes
   ngOnDestroy(){
      this.dtTrigger.unsubscribe();
    }


}

