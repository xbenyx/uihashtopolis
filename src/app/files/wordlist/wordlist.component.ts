import { Component, OnInit } from '@angular/core';
import { faTrash, faHomeAlt, faPlus, faUpload, faFileImport, faDownload, faPaperclip, faLink, faLock} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-wordlist',
  templateUrl: './wordlist.component.html',
  styleUrls: ['../files.component.scss']
})
export class WordlistComponent implements OnInit {
  faTrash=faTrash;
  faHome=faHomeAlt;
  faPlus=faPlus;
  faUpload=faUpload;
  faFileImport=faFileImport;
  faDownload=faDownload;
  faPaperclip=faPaperclip;
  faLink=faLink;
  faLock=faLock;

  groups: any[];

  public isCollapsed = true;

  constructor() { }

  ngOnInit(): void {
    this.groups = ['Admin', 'Standard User'];
  }

}
