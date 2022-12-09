import { faEdit, faTrash, faHomeAlt, faPlus, faUpload, faFileImport, faDownload, faPaperclip, faLink, faLock} from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js'; //ToDo Change to a Common Module
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

import { fileSizeValue, validateFileExt } from '../../shared/utils/util';

import { FilesService } from '../../service/files/files.service';
import { AccessGroupsService } from '../../service/accessgroups.service';

import { AccessGroup } from '../../models/access-group';

@Component({
  selector: 'app-wordlist',
  templateUrl: './wordlist.component.html'
})
export class WordlistComponent implements OnInit {
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

  public allfiles: {fileId: number, filename: string, size: number, isSecret: number, fileType: number, accessGroupId: number, lineCount:number}[] = [];

  constructor(
    private filesService: FilesService,
    private http: HttpClient,
    private accessgroupService:AccessGroupsService) { }

// accessgroup: AccessGroup; //Use models when data structure is reliable
  accessgroup: any[]

// Render Table with Datatables directive
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};

  ngOnInit(): void {
    const maxResults = 3000; //Maximum number of results

    this.accessgroupService.getAccessGroups().subscribe((agroups: any) => {
      this.accessgroup = agroups.values;
    });

    let params = {'maxResults': maxResults, 'expand': 'accessGroup', 'filter': 'fileType=0'}
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

  onuploadFile(fileType: string){
    const formData = new FormData();
    formData.set("filename", this.fileName)
    formData.set("filename", this.fileSize)
    formData.set("isSecret", "1")
    formData.set("filetype", fileType)
    console.log(formData)
    // formData.reset();
    Swal.fire({
      title: "File Updated!",
      text: "Check below!",
      icon: "success",
      button: "Aww yiss!",
    });
  }

  deleteFile(id: number){
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        Swal.fire(
          "File has been deleted!",
          {
          icon: "success",
        });
      } else {
        Swal.fire("Your imaginary file is safe!")
      }
    });
  }

  // Add unsubscribe to detect changes
   ngOnDestroy(){
      this.dtTrigger.unsubscribe();
    }


}
