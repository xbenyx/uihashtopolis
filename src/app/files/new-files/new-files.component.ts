import { faPlus, faUpload, faDownload, faLink, faFileUpload} from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Injectable, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, ReplaySubject, Subject, Subscription, map, pairwise, startWith, switchMap, take, takeUntil, tap } from 'rxjs';
import { Buffer } from 'buffer';

import { UploadTUSService } from 'src/app/core/_services/files/files_tus.service';
import { GlobalService } from 'src/app/core/_services/main.service';
import { FileSizePipe } from 'src/app/core/_pipes/file-size.pipe';
import { environment } from './../../../environments/environment';
import { PageTitle } from 'src/app/core/_decorators/autotitle';
import { validateFileExt } from '../../shared/utils/util';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadFileTUS } from '../../core/_models/files';
import { SERV } from '../../core/_services/main.config';
import { subscribe } from 'diagnostics_channel';

@Injectable()
export class UnsubscriberService implements OnDestroy {
  private readonly _destroy$ = new Subject<void>();

  public readonly takeUntilDestroy = <T>(
    origin: Observable<T>
  ): Observable<T> => origin.pipe(takeUntil(this._destroy$));

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}

@Component({
  selector: 'app-new-files',
  templateUrl: './new-files.component.html',
  providers: [UnsubscriberService,FileSizePipe]
})
@PageTitle(['New File'])
export class NewFilesComponent implements OnInit {

  faFileUpload=faFileUpload;
  faDownload=faDownload;
  faUpload=faUpload;
  faLink=faLink;
  faPlus=faPlus;

  private maxResults = environment.config.prodApiMaxResults;

  constructor(
    private readonly _unsubscriber: UnsubscriberService,
    private uploadService:UploadTUSService,
    private route:ActivatedRoute,
    private gs: GlobalService,
    private fs:FileSizePipe,
    private router: Router
  ) {

   }

  accessgroup: any[]
  filterType: number;
  whichView: string;
  createForm: FormGroup;
  submitted = false;

  ngOnInit(): void {

    this.getLocation();

    this.loadData();

    this.createForm = new FormGroup({
      filename: new FormControl(''),
      isSecret: new FormControl(false),
      fileType: new FormControl(this.filterType),
      accessGroupId: new FormControl(1),
      sourceType: new FormControl('import' || ''),
      sourceData: new FormControl(''),
    });
    this.createForm.valueChanges.pipe(this._unsubscriber.takeUntilDestroy).subscribe(console.log);
    this.createForm.statusChanges.pipe(this._unsubscriber.takeUntilDestroy).subscribe(console.log);

    this.uploadProgress = this.uploadService.uploadProgress.pipe(this._unsubscriber.takeUntilDestroy);

  }

  loadData(){

    const params = {'maxResults': this.maxResults};

    this.gs.getAll(SERV.ACCESS_GROUPS,params).subscribe((agroups: any) => {
      this.accessgroup = agroups.values;
    });

  }

  /**
   * Create File
   *
  */
  private _createSubs = new Subscription();
  onSubmit(): void{
    if (this.createForm.valid && this.submitted === false) {

    let form = this.onPrep(this.createForm.value, false);

    this.submitted =true;

    if(form.status === false){
      this._createSubs.add(this.gs.create(SERV.FILES,form.update).pipe(this._unsubscriber.takeUntilDestroy).subscribe(() => {
        form = this.onPrep(this.createForm.value, true);
        Swal.fire({
          title: "Success",
          text: "New File created!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        });
        this.submitted = false;
        // this.router.navigate(['/files',this.redirect]);
        // setTimeout(() => { this.router.navigate(['/files',this.redirect]); },500)
        // setTimeout(() => { window.location.reload(); },100)
      }));
    }
  }
}

onPrep(obj: any, status: boolean){
  let sourcadata;
  let fname;
  if(obj.sourceType == 'inline'){
    fname = obj.filename;
    sourcadata = Buffer.from(obj.sourceData).toString('base64');
  }else{
    sourcadata = this.fileName;
    fname = this.fileName;
  }
  const res = {
    "update":{
      "filename": fname,
      "isSecret": obj.isSecret,
      "fileType": this.filterType,
      "accessGroupId": obj.accessGroupId,
      "sourceType": obj.sourceType,
      "sourceData": sourcadata
    },"status": status
    }
    return res;
}

souceType(type: string, view: string){
  this.viewMode = view;
  this.createForm.patchValue({
    filename: '',
    accessGroupId: 1,
    sourceType:type,
    sourceData:''
  });
}

// Get Title
  public title: string;
  public redirect: string;
  getLocation(){
    this.route.data.subscribe(data => {
      switch (data['kind']) {

        case 'wordlist-new':
          this.filterType = 0;
          this.title = 'New Wordlist';
          this.redirect = 'wordlist';
        break;

        case 'rule-new':
          this.filterType = 1;
          this.title = 'New Rule';
          this.redirect = 'rules';
        break;

        case 'other-new':
          this.filterType = 2;
          this.title = 'New Other';
          this.redirect = 'other';
        break;

      }
    })
  }

// Uploading file
  @ViewChild('file', {static: false}) file: ElementRef;
  name = '!!!';
  viewMode = 'tab1';
  uploadProgress: Observable<UploadFileTUS[]>;
  filenames: string[] = [];

  isHovering: boolean;

  toggleHover(event) {
    this.isHovering = event;
  }

  validateFileExt = validateFileExt;

  selectedFile: '';
  fileGroup: number;
  fileToUpload: File | null = null;
  fileSize: any;
  fileName: any;

  handleFileInput(event: any) {
    this.fileToUpload = event.target.files[0];
    this.fileSize = this.fileToUpload.size;
    this.fileName = this.fileToUpload.name;
    $('.fileuploadspan').text( this.fs.transform(this.fileToUpload.size,false));
  }

 private subs: Subscription[] = [];

 onuploadFile(files: FileList) {
    const upload: Array<any> = [];
    for (let i = 0; i < files.length; i++) {
      upload.push(
        this.uploadService.uploadFile(
          files[i], files[i].name
        )
      )
    }
    console.log('start file uploading');
    this.onceUploadCreate();
    this.reset();
  }

  onceUploadCreate(){
    this.uploadService.uploadProgress.pipe(this._unsubscriber.takeUntilDestroy).subscribe(el=>{
      el.forEach(progress=>{
        if((Number(progress.progress) === 100 && progress.filename === this.fileName) || ( progress.filename === this.fileName && progress.status === 'EXISTED')){
          console.log(progress.progress)
          console.log(progress.time)
          console.log(progress.status)
          console.log(progress.filename)
          console.log(this.fileName)
          setTimeout(() => { this.onSubmit(); },500)
        }
      })
    })
  }

  reset() {
    this.file.nativeElement.value = null;
  }

  ngOnDestroy() {
    this.subs.forEach((s) => s.unsubscribe());
  }

}
