import { Component, OnInit } from '@angular/core';
import { faEdit, faTrash, faHomeAlt, faPlus, faUpload, faFileImport, faDownload, faPaperclip, faLink, faLock} from '@fortawesome/free-solid-svg-icons';
import { FilesService } from '../../service/files/files.service';
import { Subject } from 'rxjs';
import { FormControl, FormGroup} from '@angular/forms';
import { fileSizeValue, validateFileExt } from '../../shared/utils/util';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-wordlist',
  templateUrl: './wordlist.component.html',
  styleUrls: ['../files.component.scss']
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

  constructor(private filesService: FilesService, private http: HttpClient) { }

  groups: any[];

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};

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

  ngOnInit(): void {
    this.groups = ['Admin', 'Standard User'];

    this.filesService.getFiles().subscribe((files: any) => {
      this.allfiles = files;
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

}
