import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
export class NewPreconfiguredTasksComponent implements OnInit {
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
      'attackCmd': new FormControl('', [Validators.required]),
      'maxAgents': new FormControl(null || this.maxAgents),
      'chunkTime': new FormControl(null || this.chunkTime),
      'statusTimer': new FormControl(null || this.statusTimer),
      'color': new FormControl(''),
      'isCpuTask': new FormControl(null || false),
      "crackerBinaryTypeId": new FormControl(null || 0),
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

  ngAfterViewInit() {

    let params = {'maxResults': this.maxResults }

    this.filesService.getFiles(params).subscribe((files: any) => {
      var self = this;
      var selftext = this;
      console.log(files.values)
      var response = files.values;
      ($("#files") as any).selectize({
        maxItems: null,
        // plugins: ["restore_on_backspace","drag_drop"],
        plugins: ["restore_on_backspace"],
        // delimiter: ",",
        persist: false,
        valueField: "fileId",
        placeholder: "Search for file...",
        labelField: "filename",
        searchField: ["filename"],
        sortField: 'fileType',
        loadingClass: 'Loading..',
        highlight: true,
        onItemAdd: function (value, $item) {
          selftext.OnChangeAttack(this.getItem(value)[0].innerHTML);
        },
        onChange: function (value) {
          self.OnChangeFile(value); // We need to overide DOM event, Angular vs Jquery
        },
        render: {
          option: function (item, escape) {
            return '<div  class="hashtype_selectize">' + escape(item.fileType == 0 ? 'Wordlist':'' || item.fileType == 1 ? 'Rules':'Other') + ' -  ' + escape(item.filename) + '</div>';
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
      this.createForm.patchValue({
        attackCmd: value
        // files: value
      });
      // this._changeDetectorRef.detectChanges();
    }

    OnChangeAttack(value){
      // this.createForm.patchValue({
      //   attackCmd: value
      // });
      // this._changeDetectorRef.detectChanges();
    }

    // OnChangeValue(value){
    //   // this.signupForm.patchValue({
    //   //   hashTypeId: value
    //   // });
    //   // this._changeDetectorRef.detectChanges();
    // }

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
