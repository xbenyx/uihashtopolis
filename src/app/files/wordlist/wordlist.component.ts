import { Component, OnInit } from '@angular/core';
import { faEdit, faTrash, faHomeAlt, faPlus, faUpload, faFileImport, faDownload, faPaperclip, faLink, faLock} from '@fortawesome/free-solid-svg-icons';
import { FilesService } from '../../service/files/files.service';
import { Subject } from 'rxjs';
import { fileSizeValue, validateFileExt } from '../../shared/utils/util';

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

  constructor(private filesService: FilesService) { }

  groups: any[];

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};

  fileSizeValue = fileSizeValue;

  validateFileExt = validateFileExt;

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
