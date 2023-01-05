import { Component, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Subject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-agent',
  templateUrl: './edit-agent.component.html'
})
export class EditAgentComponent implements OnInit {

  constructor() { }

  signupForm: FormGroup

  ngOnInit(): void {

    this.signupForm = new FormGroup({
      'isActive': new FormControl(''),
      'userId': new FormControl(''),
      'agentName': new FormControl(''),
      'cpuOnly': new FormControl(''),
      'cmdPars': new FormControl(''),
      'ignoreErrors': new FormControl(''),
      'isTrusted': new FormControl(''),
      'assignment': new FormControl(''),
    });

  }

  onSubmit(){

  }

}
