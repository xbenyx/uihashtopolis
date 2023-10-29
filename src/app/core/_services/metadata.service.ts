import { Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  // New Global Permission Group

  newglobalpermissionsgpInfo = [
    { title: 'New Global Permission Group', subtitle: false, submitok: 'New Global Permission Group created!', submitokredirect: '/users/global-permissions-groups'},
  ];

  newglobalpermissionsgp = [
    { name: 'name', label: 'Name', type: 'text', requiredasterisk: true, tooltip: false, validators: [Validators.required] }
  ];

  // New Access Groups

  newaccessgroupsInfo = [
    { title: 'New Access Group', subtitle: false, submitok: 'New Access Group created!', submitokredirect: '/users/access-groups'},
  ];

  newaccessgroups = [
    { name: 'groupName', label: 'Name', type: 'text', requiredasterisk: true, tooltip: false, validators: [Validators.required] }
  ];

  // Edit Access Group

  editaccessgroupsInfo = [
    { title: 'New Access Group', subtitle: false, submitok: 'New Access Group created!', submitokredirect: '/users/access-groups'},
  ];

  editaccessgroups = [
    { name: 'groupName', label: 'Name', type: 'text', requiredasterisk: true, tooltip: false, validators: [Validators.required] }
  ];


  getFormMetadata(formName: string): any[] {
    if (formName === 'newglobalpermissionsgp') {
      return this.newglobalpermissionsgp;
    }
    else if (formName === 'newaccessgroups') {
      return this.newaccessgroups;
    }
    else if (formName === 'editaccessgroups') {
      return this.editaccessgroups;
    }
    else {
      return [];
    }
  }

  getInfoMetadata(formName: string): any[] {
    if (formName === 'newglobalpermissionsgpInfo') {
      return this.newglobalpermissionsgpInfo;
    }
    else if (formName === 'newaccessgroupsInfo') {
      return this.newaccessgroupsInfo;
    }
    else if (formName === 'editaccessgroupsInfo') {
      return this.editaccessgroupsInfo;
    }
    else {
      return [];
    }
  }

}
