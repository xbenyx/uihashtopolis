import { faMagnifyingGlass, faUpload, faInfoCircle, faFileUpload, faSearchPlus } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, ChangeDetectionStrategy ,ChangeDetectorRef, HostListener  } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from './../../../environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';
import { Observable, delay } from 'rxjs';
import { Buffer } from 'buffer';

import { UIConfigService } from 'src/app/core/_services/shared/storage.service';
import { UploadTUSService } from '../../core/_services/files/files_tus.service';
import { fileSizeValue, validateFileExt } from '../../shared/utils/util';
import { GlobalService } from 'src/app/core/_services/main.service';
import { PageTitle } from 'src/app/core/_decorators/autotitle';
import { ShowHideTypeFile } from '../../shared/utils/forms';
import { UploadFileTUS } from '../../core/_models/files';
import { SERV } from '../../core/_services/main.config';

@Component({
  selector: 'app-new-hashlist',
  templateUrl: './new-hashlist.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
@PageTitle(['New Hashlist'])
export class NewHashlistComponent implements OnInit {
  /**
   * Fa Icons
   *
  */
  faUpload=faUpload;
  faFileUpload=faFileUpload;
  faInfoCircle=faInfoCircle;
  faMagnifyingGlass=faMagnifyingGlass;

  faSearchPlus=faSearchPlus;

  /**
   * Form Settings
   *
  */
  signupForm: FormGroup;
  ShowHideTypeFile = ShowHideTypeFile;
  radio=true;
  brainenabled:any;
  hashcatbrain: string;

  // accessgroup: AccessGroup; //Use models when data structure is reliable
  accessgroup: any[]
  private maxResults = environment.config.prodApiMaxResults;

  constructor(
     private _changeDetectorRef: ChangeDetectorRef,
     private uploadService:UploadTUSService,
     private uiService: UIConfigService,
     private modalService: NgbModal,
     private gs: GlobalService,
     private router: Router,
     ) {
     }

  ngOnInit(): void {

    this.brainenabled = this.uiService.getUIsettings('hashcatBrainEnable').value;

    const params = {'maxResults': this.maxResults};

    this.gs.getAll(SERV.ACCESS_GROUPS, params).subscribe((agroups: any) => {
      this.accessgroup = agroups.values;
    });

    this.signupForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'hashTypeId': new FormControl('', [Validators.required]),
      'format': new FormControl(null),
      'separator': new FormControl(null || ';'),
      'isSalted': new FormControl(false),
      'isHexSalt': new FormControl(false),
      'accessGroupId': new FormControl(null, [Validators.required]),
      'useBrain': new FormControl(+this.brainenabled=== 1? true:false),
      'brainFeatures': new FormControl(null || 3),
      'notes': new FormControl(''),
      "sourceType": new FormControl('import' || null),
      "sourceData": new FormControl(''),
      'hashCount': new FormControl(0),
      'isArchived': new FormControl(false),
      'isSecret': new FormControl(true),
    });

  }

  // Set permissions
  createHashlistAccess: any;

  setAccessPermissions(){
    this.gs.get(SERV.USERS,this.gs.userId,{'expand':'globalPermissionGroup'}).subscribe((perm: any) => {
        this.createHashlistAccess = perm.globalPermissionGroup.permissions.createHashlistAccess;
    });
  }

  ngAfterViewInit() {

    this.uploadProgress = this.uploadService.uploadProgress; // TUS upload progress

    const params = {'maxResults': this.maxResults};

    this.gs.getAll(SERV.HASHTYPES,params).subscribe((htypes: any) => {
      const self = this;
      const prep = htypes.values;
      const response = [];
      for(let i=0; i < prep.length; i++){
        const obj = { hashTypeId: prep[i].hashTypeId, descrId: prep[i].hashTypeId +' '+prep[i].description };
        response.push(obj)
      }
      ($("#hashtype") as any).selectize({
        plugins: ['remove_button'],
        valueField: "hashTypeId",
        placeholder: "Search hashtype...",
        labelField: "descrId",
        searchField: ["descrId"],
        loadingClass: 'Loading..',
        highlight: true,
        onChange: function (value) {
            self.OnChangeValue(value);
        },
        render: {
          option: function (item, escape) {
            return '<div  class="hashtype_selectize">' + escape(item.descrId) + '</div>';
          },
        },
        onInitialize: function(){
          const selectize = this;
            selectize.addOption(response);
            const selected_items = [];
            $.each(response, function( i, obj) {
                selected_items.push(obj.id);
            });
            selectize.setValue(selected_items);
          }
          });
      });

    }

  OnChangeValue(value){
    this.signupForm.patchValue({
      hashTypeId: Number(value)
    });
    this._changeDetectorRef.detectChanges();
  }

  // FILE UPLOAD: TUS File Uload
  uploadProgress: Observable<UploadFileTUS[]>;
  filenames: string[] = [];

  onuploadFile(event: any) {
    const file = event.item(0)
    // const filename = `${new Date().getTime()}_${file.name}`;
    const filename = file.name;
    // console.log(`Uploading ${file.name} with size ${file.size} and type ${file.type}`);
    this.uploadService.uploadFile(file, filename);
  }

  onuploadCancel(filename: string) {
    // this.uploadService.cancelUpload(filename);
  }

  /**
   * Drop Zone Area
   *
  */
  fileList : any = [];
  invalidFiles : any = [];

  onFilesChange(fileList : Array<File> | DragEvent){
    this.fileList = fileList;
  }

  onFileInvalids(fileList : Array<File> | DragEvent){
    this.invalidFiles = fileList;
  }

  /**
   * Handle Input and return file size
   * @param event
  */

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
    $('.fileuploadspan').text('Size: '+fileSizeValue(this.fileToUpload.size));
  }

  /**
   * Create Hashlist
   *
  */

  onSubmit(): void{
      if(this.createHashlistAccess || typeof this.createHashlistAccess == 'undefined'){
      if (this.signupForm.valid) {

      const res = this.handleUpload(this.signupForm.value);

      this.gs.createHashlist(SERV.HASHLISTS,res).subscribe(() => {
        Swal.fire({
          title: "Success",
          text: "New HashList created!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/hashlists/hashlist']);
      }
    );
    }
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

  handleUpload(arr: any){
    const res = {
      'name': arr.name,
      'hashTypeId': arr.hashTypeId,
      'format': arr.format,
      'separator': arr.separator,
      'isSalted': arr.isSalted,
      'isHexSalt': arr.isHexSalt,
      'accessGroupId': arr.accessGroupId,
      'useBrain': arr.useBrain,
      'brainFeatures': arr.brainFeatures,
      'notes': arr.notes,
      "sourceType": arr.sourceType,
      "sourceData": Buffer.from(arr.sourceData).toString('base64'),
      'hashCount': arr.hashCount,
      'isArchived': arr.isArchived,
      'isSecret': arr.isSecret,
     }
     return res;
  }

  // @HostListener allows us to also guard against browser refresh, close, etc.
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (!this.canDeactivate()) {
      $event.returnValue = "IE and Edge Message";
    }
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.signupForm.valid) {
    return false;
    }
    return true;
  }

  // Open Modal
    // Modal Information
    closeResult = '';
    open(content) {
      this.modalService.open(content, { size: 'xl' }).result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        },
      );
    }

    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
    }
}
