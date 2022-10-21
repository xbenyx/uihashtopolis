import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../service/projects/projects.service';
import { ActivatedRoute, Params } from '@angular/router';
import { faHomeAlt, faPlus, faTrash, faEdit, faCode, faCalendar, faFileText, faBook, faBullhorn} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';

export interface UserInfo {
  name:string;
  phoneNumber:number;
  email:string;
  address:any;
  zipCode:number;
  cityState:any;
  nameOnCard:string;
  creditCardNumber:number;
  expirationDate:number;
}

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['../projects.component.scss']
})

export class NewProjectComponent implements OnInit {
  public isCollapsed = true;
  faHome=faHomeAlt;
  faPlus=faPlus;
  faTrash=faTrash;
  faEdit=faEdit;
  faCode=faCode;
  faCalendar=faCalendar;
  faFileText=faFileText;
  faBook=faBook;
  faBullhorn=faBullhorn;


  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};

  // public projects: {preprocessorId: number}[] = [];
  public projects: [] = [];

  projectinfoComplete = true;
  addressComplete = false;
  creditCardComplete = false;
  completedOrder = false;

  stepOne = false;
  stepTwo = false;
  stepThree = false;
  stepFour = false;

  customer = false;



  customerInformation = [];


  fruite = ['apple','orange'];

  userInfoArray: UserInfo;

  name;

  constructor(private projectService:ProjectService) { }

  ngOnInit() {
    // console.log('Fruite' + this.fruite.push('banana'));
    // console.log(this.fruite);
    this.projectService.projects().subscribe((pro: any) => {
      this.projects = pro;
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

  projectInfoSubmit() {
    this.projectinfoComplete = false;
    this.addressComplete = true;
    this.stepOne = true;
    this.customer = true;



    this.customerInformation.push(this.userInfoArray.name);
    this.customerInformation.push({
      name: this.userInfoArray.name,
      email: this.userInfoArray.email
    });

    console.log('Your Info ' + this.name.userInfoArray);
  }

  addressSubmit() {
    this.addressComplete = false;
    this.creditCardComplete = true;
    this.stepTwo = true;
  }

  creditCardSubmit() {
    this.creditCardComplete = false;
    this.completedOrder = true;
    this.stepThree = true;
  }

}
