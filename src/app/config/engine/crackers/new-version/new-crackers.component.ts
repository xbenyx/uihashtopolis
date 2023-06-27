import { Component, OnInit, ChangeDetectionStrategy ,ChangeDetectorRef  } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { faDownload, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CrackerService } from '../../../../core/_services/config/cracker.service';
import { PageTitle } from 'src/app/core/_decorators/autotitle';

@Component({
  selector: 'app-new-crackers',
  templateUrl: './new-crackers.component.html'
})
@PageTitle(['New Crackers'])
export class NewCrackersComponent implements OnInit {

  // Loader
  isLoading = false;
  faDownload=faDownload;
  faInfoCircle=faInfoCircle;

  editMode = false;
  editedTypeIndex: number;
  createForm: FormGroup

  constructor(
    private crackerService: CrackerService,
    private route:ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.route.params
    .subscribe(
      (params: Params) => {
        this.editedTypeIndex = +params['id'];
        this.editMode = params['id'] != null;
      }
    );

    this.createForm = new FormGroup({
      'binaryName': new FormControl('', [Validators.required]),
      'version': new FormControl('', [Validators.required]),
      'downloadUrl': new FormControl('', [Validators.required]),
      'crackerBinaryTypeId': new FormControl(this.editedTypeIndex),
    });
  }

  onSubmit(){
    if (this.createForm.valid) {

      this.isLoading = true;

      this.crackerService.createCrackerBinary(this.editedTypeIndex, this.createForm.value).subscribe((hasht: any) => {
        const response = hasht;
        this.isLoading = false;
          Swal.fire({
            title: "Success",
            text: "New Version created!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
          this.createForm.reset(); // success, we reset form
          this.router.navigate(['/config/engine/crackers']);
        }
      );
    }
  }

}
