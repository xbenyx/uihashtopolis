import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { environment } from './../../../environments/environment';

import { PreTasksService } from '../../core/_services/tasks/pretasks.sevice';
import { CrackerService } from '../../core/_services/config/cracker.service';
import { FilesService } from '../../core/_services/files/files.service';
import { FileTypePipe } from 'src/app/core/_pipes/file-type.pipe';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-preconfigured-tasks',
  templateUrl: './new-preconfigured-tasks.component.html'
})
export class NewPreconfiguredTasksComponent implements OnInit,AfterViewInit {
  @ViewChild('cmdAttack', {static: true}) cmdAttack: any;
  // Loader
  isLoading = false;
  faInfoCircle=faInfoCircle;
  // Config
  private maxResults = environment.config.prodApiMaxResults
  private priority = environment.config.tasks.priority;
  private maxAgents = environment.config.tasks.maxAgents;
  private chunkTime = environment.config.tasks.chunkTime;
  private statusTimer = environment.config.tasks.statusTimer;

  constructor(
    private preTasksService: PreTasksService,
    private crackerService: CrackerService,
    private filesService: FilesService,
    private modalService: NgbModal,
    private fileType: FileTypePipe
  ) { }

  createForm: FormGroup
  crackertype: any
  color: string = '#fff'

  ngOnInit(): void {

    this.createForm = new FormGroup({
      'taskName': new FormControl('', [Validators.required]),
      'attackCmd': new FormControl(null || '#HL#', [Validators.required]),
      'maxAgents': new FormControl(null || this.maxAgents),
      'chunkTime': new FormControl(null || this.chunkTime),
      'statusTimer': new FormControl(null || this.statusTimer),
      'color': new FormControl(''),
      'isCpuTask': new FormControl(null || false),
      "crackerBinaryTypeId": new FormControl(null || 1),
      'isSmall': new FormControl(null || false),
      'useNewBench': new FormControl(null || true),
      'isMaskImport': new FormControl(false),
      'files': new FormControl('')
    });

    this.crackerService.getCrackerType().subscribe((crackers: any) => {
      this.crackertype = crackers.values;
    });

  }

  OnChangeValue(value){
    this.createForm.patchValue({
      color: value
    });
    // this._changeDetectorRef.detectChanges();
  }

  onSubmit(){
    if (this.createForm.valid) {

      this.isLoading = true;

      this.preTasksService.createPretask(this.createForm.value).subscribe((pret: any) => {
        const response = pret;
        console.log(response);
        this.isLoading = false;
          Swal.fire({
            title: "Good job!",
            text: "New PreTask created!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
          this.createForm.reset(); // success, we reset form
        },
        errorMessage => {
          // check error status code is 500, if so, do some action
          Swal.fire({
            title: "Error!",
            text: "PreTask was not created, please try again!",
            icon: "warning",
            showConfirmButton: true
          });
        }
      );
    }
  }
  public matchFileType: any

  ngAfterViewInit() {

    let params = {'maxResults': this.maxResults }

    this.filesService.getFiles(params).subscribe((ptask: any) => {
      var self = this;
      var selftext = this;
      let response = ptask.values;
      ($("#files") as any).selectize({
        maxItems: 10,
        plugins: ["restore_on_backspace"],
        delimiter: ",",
        persist: false,
        valueField: "fileId",
        placeholder: "Search for file...",
        labelField: "filename",
        searchField: ["fileType", "filename"],
        sortField: 'fileType',
        loadingClass: 'Loading..',
        highlight: true,
        onItemAdd: function (value, $item) {
          this.matchFileType = response.find(element => element.fileId === +value);
          selftext.OnChangeAttack(this.getItem(value)[0].innerHTML, this.matchFileType);
        },
        onChange: function (value) {
          self.OnChangeFile(value); // We need to overide DOM event, Angular has some issues with Jquery
        },
        render: {
          option: function (item, escape) {
            return '<div  class="hashtype_selectize">' + escape(item.fileType == 0 ? 'Wordlist':'' || item.fileType == 1 ? 'Rules':'Other') + ' -  ' + escape(item.filename) +' ('+escape(item.size)+')'+'</div>';
          },
        },
        onInitialize: function(){
          var selectize = this;
            selectize.addOption(response); // This is will add to option
            var selected_items = [];
            $.each(response, function( i, obj) {
                selected_items.push(obj.id);
            });
            selectize.setValue(selected_items); //this will set option values as default
          }
          });
        });
    }

    OnChangeFile(value){
      let formArr = new FormArray([]);
      for (let val of value) {
        formArr.push(
          new FormControl(+val)
        );
      }
      // this.createForm = new FormGroup({
      //   supertaskName: new FormControl('', [Validators.required]),
      //   pretasks: formArr
      // });
      this.createForm.patchValue({
        // attackCmd: value
        files: formArr
      });
      // this._changeDetectorRef.detectChanges();
    }

    OnChangeAttack(item: string, arr: string){
      let currentCmd = this.createForm.get('attackCmd').value;
      let newCmd = item;
      this.validateFile(newCmd);
      if (arr['fileType'] === 1){
        newCmd = '-r '+ newCmd;
      }
      this.createForm.patchValue({
        attackCmd: currentCmd+' '+ newCmd
      });
      // this._changeDetectorRef.detectChanges();
    }

    validateFile(value){
      if(value.split('.').pop() == 'txt'){
        Swal.fire({
          title: "Heads Up!",
          text: "Hashcat has some issues loading 7z files. Better convert it to a hash file ;)",
          icon: "warning",
        })
      }
    }

  // Modal Information
  attackmode =[
    {'value': '0', 'name': 'Straight(Using rules)' },
    {'value': '1', 'name': 'Combination' },
    {'value': '3', 'name': 'Brute-force'},
    {'value': '6', 'name': 'Hybrid Dictionary+ Mask'},
    {'value': '7', 'name': 'Hybrid Mask + Dictionary'},
  ]

  attackex =[
    {'value': 'Dictionary', 'example': '-w3 -O #HL# -a 0 rockyou.txt' },
    {'value': 'Dictionary + Rules', 'example': '-w3 -O #HL# -a 0 rockyou.txt -r base64rule.txt' },
    {'value': 'Combination', 'example': '-w3 -O #HL# -a 1 rockyou.txt rockyou2.txt'},
    {'value': 'Hybrid Dictionary + Mask', 'example': '-w3 -O #HL# -a 6 -m dict.txt ?a?a?a?a'},
    {'value': 'Hybrid Mask + Dictionary', 'example': '-w3 -O #HL# -a 7 -m ?a?a?a?a dict.txt'},
  ]

  charsets =[
    {'value': '?l', 'descrip': 'abcdefghĳklmnopqrstuvwxyz' },
    {'value': '?u', 'descrip': 'ABCDEFGHĲKLMNOPQRSTUVWXYZ' },
    {'value': '?d', 'descrip': '0123456789' },
    {'value': '?h', 'descrip': '0123456789abcdef' },
    {'value': '?H', 'descrip': '0123456789ABCDEF' },
    {'value': '?s', 'descrip': '«space»!"#$%&()*+,-./:;<=>?@[\]^_`{|}~'},
    {'value': '?a', 'descrip': '?l?u?d?s'},
    {'value': '?b', 'descrip': '0x00 - 0xff'},
  ]

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
