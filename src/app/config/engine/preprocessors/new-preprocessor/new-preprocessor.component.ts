import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { PreprocessorService } from '../../../../core/_services/config/preprocessors.service';

@Component({
  selector: 'app-new-preprocessor',
  templateUrl: './new-preprocessor.component.html'
})
export class NewPreprocessorComponent implements OnInit {
  // Loader
  isLoading = false;

  constructor(
    private preprocessorService:PreprocessorService,
    private route:ActivatedRoute,
    private router: Router,
  ) { }

  // Create or Edit Preprocessor
  signupForm: FormGroup;
  whichView: string;

  prep: any[];

  ngOnInit(): void {

    this.signupForm = new FormGroup({
      'name': new FormControl('', [Validators.required, Validators.minLength(1)]),
      'url': new FormControl('', [Validators.required, Validators.minLength(1)]),
      'binaryName': new FormControl('', [Validators.required]),
      'keyspaceCommand': new FormControl('--keyspace' || null),
      'skipCommand': new FormControl('--skip' || null),
      'limitCommand': new FormControl('--limit' || null)
    });

    this.route.data.subscribe(data => {
      switch (data['kind']) {

        case 'new-preprocessor':
          this.whichView = 'create';
        break;

        case 'edit-preprocessor':
          this.whichView = 'edit';
          this.isLoading = true;

          const id = +this.route.snapshot.params['id'];
          this.preprocessorService.getPreprocessor(id).subscribe((prep: any) => {
            this.prep = prep;
            this.isLoading = false;
          });
        break;

      }
    });

  }
  swap:any
  onSubmit(): void{
    if (this.signupForm.valid) {

      this.isLoading = true;

      switch (this.whichView) {

        case 'create':
          this.preprocessorService.createPreprocessor(this.signupForm.value)
          .subscribe((prep: any) => {
            const response = prep;
            console.log(response);
            this.isLoading = false;
              Swal.fire({
                title: "Good job!",
                text: "New Preprocessor created!",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
              });
              this.router.navigate(['config/engine/preprocessors']);
            },
            errorMessage => {
              // check error status code is 500, if so, do some action
              Swal.fire({
                title: "Error!",
                text: "Preprocessor was not created, please try again!",
                icon: "warning",
                showConfirmButton: true
              });
            }
          );
        break;

        case 'edit':
          const id = +this.route.snapshot.params['id'];
          this.preprocessorService.updateHashType(id,this.signupForm.value)
          .subscribe((prep: any) => {
            const response = prep;
            console.log(response);
            this.isLoading = false;
              Swal.fire({
                title: "Good job!",
                text: "New Preprocessor created!",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
              });
              this.router.navigate(['config/engine/preprocessors']);
            },
            errorMessage => {
              // check error status code is 500, if so, do some action
              Swal.fire({
                title: "Error!",
                text: "Preprocessor was not created, please try again!",
                icon: "warning",
                showConfirmButton: true
              });
            }
          );
        break;

      }
    }

  }

}
