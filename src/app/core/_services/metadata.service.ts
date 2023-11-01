import { environment } from 'src/environments/environment';
import { FormControl, Validators } from '@angular/forms';
import { SERV } from '../../core/_services/main.config';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './main.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  constructor(
    private http: HttpClient,
    private gs: GlobalService
    ) { }

  private maxResults = environment.config.prodApiMaxResults;

  // ToDo in validators, go to the database and add max lenght

  // //
  // CONFIG
  // //

  // New Cracker

  newcrackerInfo = [
    { title: 'New Cracker Type', customform: false, subtitle: false, submitok: 'New Cracker created!', submitokredirect: '/config/engine/crackers'},
  ];

  newcracker = [
    { name: 'typeName', label: 'Type',  type: 'select', selectOptions: [{ label: 'Hashcat', value: 'hashcat' },{ label: 'Generic Cracker', value: 'generic' }], requiredasterisk: true, tooltip: false, validators: [Validators.required] },
    { name: 'isChunkingAvailable', label: 'Chunking Available',  type: 'select', selectOptions: [{ label: 'Yes', value: true },{ label: 'No', value: false }], requiredasterisk: true, tooltip: false, validators: [Validators.required] }
  ];

  // Agent Binary

  newagentbinaryInfo = [
    { title: 'New Agent Binary', customform: false, subtitle: false, submitok: 'New Agent Binary created!', submitokredirect: 'config/engine/agent-binaries'},
  ];

  editagentbinaryInfo = [
    { title: 'Edit Agent Binary', customform: false, subtitle: false, submitok: 'Agent Binary saved!', submitokredirect: 'config/engine/agent-binaries', deltitle: 'Agent Binaries', delsubmitok: 'Deleted Agent Binary', delsubmitokredirect: 'config/engine/agent-binaries', delsubmitcancel:'Agent Binary is safe!'},
  ];

  agentbinary = [
    { name: 'type', label: 'Type',  type: 'text', requiredasterisk: true, tooltip: false, validators: [Validators.required] },
    { name: 'operatingSystems', label: 'Operating Systems',  type: 'text', requiredasterisk: true, tooltip: false, validators: [Validators.required] },
    { name: 'filename', label: 'Filename',  type: 'text', requiredasterisk: true, tooltip: 'Placed in bin folder', validators: [Validators.required] },
    { name: 'version', label: 'Version',  type: 'text', requiredasterisk: true, tooltip: false, validators: [Validators.required] },
    { name: 'updateTrack', label: 'Update Track',  type: 'select', selectOptions: [{ label: 'Release', value: 'release' },{ label: 'Stable', value: 'stable' }], requiredasterisk: true, tooltip: false, validators: [Validators.required] }
  ];

  // Cracker Version

  newcrackerversionInfo = [
    { title: 'New Binary Version', customform: true, subtitle: false, submitok: 'New Version created!', submitokredirect: '/config/engine/crackers'},
  ];

  editcrackerversionInfo = [
    { title: 'Edit Binary Version', customform: false, subtitle: false, submitok: 'Cracker saved!', submitokredirect: '/config/engine/crackers', deltitle: 'Crackers', delsubmitok: 'Deleted cracker', delsubmitokredirect: 'config/engine/crackers', delsubmitcancel:'Cracker is safe!'},
  ];

  newcrackerversion = [
    { name: 'binaryName', label: 'Binary Base Name',  type: 'text', requiredasterisk: true, tooltip: 'Which needs to be called on the client without os-dependent extension', validators: [Validators.required] },
    { name: 'version', label: 'Binary Version',  type: 'text', requiredasterisk: true, tooltip: false, validators: [Validators.required] },
    { name: 'downloadUrl', label: 'Download URL',  type: 'text', requiredasterisk: true, tooltip: 'Link where the client can download a 7zip with the binary', validators: [Validators.required] },
    { name: 'crackerBinaryTypeId', label: 'crackerBinaryTypeId', type: 'hidden', replacevalue: 'editedIndex',requiredasterisk: true, tooltip: false, validators: false },
  ];

  editcrackerversion = [
    { name: 'binaryName', label: 'Binary Base Name',  type: 'text', requiredasterisk: true, tooltip: 'Which needs to be called on the client without os-dependent extension', validators: [Validators.required] },
    { name: 'version', label: 'Binary Version',  type: 'text', requiredasterisk: true, tooltip: false, validators: [Validators.required] },
    { name: 'downloadUrl', label: 'Download URL',  type: 'text', requiredasterisk: true, tooltip: 'Link where the client can download a 7zip with the binary', validators: [Validators.required] },
  ];

  // Preprocessor

  newpreprocessorInfo = [
    { title: 'New Preprocessor', customform: false, subtitle: false, submitok: 'New Preprocessor created!', submitokredirect: 'config/engine/preprocessors'},
  ];

  editpreprocessorInfo = [
    { title: 'Edit Preprocessor', customform: false, subtitle: false, submitok: 'Preprocessor saved!', submitokredirect: 'config/engine/preprocessors', deltitle: 'Preprocessors', delsubmitok: 'Deleted Preprocessor', delsubmitokredirect: 'config/engine/preprocessors', delsubmitcancel:'Preprocessor is safe!'},
  ];

  preprocessor = [
    { name: 'name', label: 'Name', type: 'text', requiredasterisk: true, tooltip: false, validators: [Validators.required] },
    { name: 'binaryName', label: 'Binary Basename', type: 'text', requiredasterisk: true, tooltip: false, validators: [Validators.required] },
    { name: 'url', label: 'Download URL', type: 'text', requiredasterisk: true, tooltip: false, validators: [Validators.required] },
    { label: 'Commands (set to empty if not available)',isTitle: true},
    { name: 'keyspaceCommand',label: 'Keyspace Command',type: 'text',requiredasterisk: false,tooltip: false,validators: false,defaultValue: '--keyspace',},
    { name: 'skipCommand',label: 'Skip Command',type: 'text',requiredasterisk: false,tooltip: false,validators: false,defaultValue: '--skip'},
    { name: 'limitCommand', label: 'Limit Command', type: 'text', requiredasterisk: false, tooltip: false, validators: false, defaultValue: '--limit'},
  ];

  // Hashtypes
  // type checkbox doesnt handle well true or false

  newhashtypeInfo = [
    { title: 'Create Hashtype', customform: false, subtitle: false, submitok: 'New Hashtype created!', submitokredirect: '/config/hashtypes'},
  ];

  edithashtypeInfo = [
    { title: 'Edit Hashtype', customform: false, subtitle: false, submitok: 'Hashtype saved!', submitokredirect: '/config/hashtypes', deltitle: 'Hashtypes', delsubmitok: 'Deleted Hashtype', delsubmitokredirect: '/config/hashtypes', delsubmitcancel:'Hashtype is safe!'},
  ];

  newhashtype = [
    { name: 'hashTypeId', label: 'Hashtype', type: 'number', requiredasterisk: true, tooltip: 'ie. Hashcat -m', validators: [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(1), this.numberValidator]},
    { name: 'description', label: 'Description', type: 'text', requiredasterisk: true, tooltip: false, validators:  [Validators.required, Validators.minLength(1)] },
    { name: 'isSalted', label: 'Salted', type: 'checkbox', requiredasterisk: false, tooltip: 'Only if there is a separate salt value', validators: false, defaultValue: false },
    { name: 'isSlowHash', label: 'Slow Hash', type: 'checkbox', requiredasterisk: false, tooltip: false, validators: false, defaultValue: false },
  ];

  edithashtype = [
    { name: 'hashTypeId', label: 'Hashtype', type: 'number', requiredasterisk: true, tooltip: 'ie. Hashcat -m', validators: [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(1), this.numberValidator], disabled: true},
    { name: 'description', label: 'Description', type: 'text', requiredasterisk: true, tooltip: false, validators:  [Validators.required, Validators.minLength(1)] },
    { name: 'isSalted', label: 'Salted', type: 'checkbox', requiredasterisk: false, tooltip: 'Only if there is a separate salt value', validators: false, defaultValue: false },
    { name: 'isSlowHash', label: 'Slow Hash', type: 'checkbox', requiredasterisk: false, tooltip: false, validators: false, defaultValue: true },
  ];

  // //
  // USERS
  // //

  newuserInfo = [
    { title: 'New User', customform: false, subtitle: false, submitok: 'New User created!', submitokredirect: 'users/all-users'},
  ];

  newuser = [
    { name: 'name', label: 'User Name', type: 'text', requiredasterisk: true, validators: [Validators.required] },
    { name: 'email', label: 'Email', type: 'email', requiredasterisk: true, validators: [Validators.required, Validators.email] },
    { name: 'globalPermissionGroupId', label: 'Access Permission Group', type: 'selectd', requiredasterisk: true, selectEndpoint$: SERV.ACCESS_PERMISSIONS_GROUPS,selectOptions$: [], validators: [Validators.required] },
  ];

  // New Global Permission Group

  newglobalpermissionsgpInfo = [
    { title: 'New Global Permission Group', customform: false, subtitle: false, submitok: 'New Global Permission Group created!', submitokredirect: '/users/global-permissions-groups'},
  ];

  newglobalpermissionsgp = [
    { name: 'name', label: 'Name', type: 'text', requiredasterisk: true, tooltip: false, validators: [Validators.required] }
  ];

  // Access Group

  newaccessgroupsInfo = [
    { title: 'New Access Group', subtitle: false, submitok: 'New Access Group created!', submitokredirect: '/users/access-groups'},
  ];

  editaccessgroupsInfo = [
    { title: 'Edit Access Group', subtitle: false, submitok: 'Access Group saved!', submitokredirect: '/users/access-groups', deltitle: 'Agent Groups', delsubmitok: 'Deleted Access Group', delsubmitokredirect: '/users/access-groups', delsubmitcancel:'Agent Group is safe!'},
  ];

  accessgroups = [
    { name: 'groupName', label: 'Name', type: 'text', requiredasterisk: true, tooltip: false, validators: [Validators.required] }
  ];


  /**
   * Retrieves form metadata based on the provided form name.
   * @param formName - The name of the form for which metadata is requested.
   * @returns An array of form metadata.
   */
  getFormMetadata(formName: string): any[] {
    if (formName === 'newcracker') {
      return this.newcracker;
    } else if (formName === 'newagentbinary' || formName === 'editagentbinary') {
      return this.agentbinary;
    } else if (formName === 'newcrackerversion') {
      return this.newcrackerversion;
    } else if (formName === 'editcrackerversion') {
      return this.editcrackerversion;
    } else if (formName === 'newpreprocessor' || formName === 'editpreprocessor') {
      return this.preprocessor;
    } else if (formName === 'newhashtype' ) {
      return this.newhashtype;
    } else if (formName === 'edithashtype') {
      return this.edithashtype;
    } else if (formName === 'newglobalpermissionsgp') {
      return this.newglobalpermissionsgp;
    } else if (formName === 'newaccessgroups' || formName === 'editaccessgroups') {
      return this.accessgroups;
    } else if (formName === 'newuser') {
      return this.newuser;
    } else {
      return [];
    }
  }

  /**
   * Retrieves info metadata based on the provided form name.
   * @param formName - The name of the info metadata for which information is requested.
   * @returns An array of info metadata.
   */
  getInfoMetadata(formName: string): any[] {
    if (formName === 'newcrackerInfo') {
      return this.newcrackerInfo;
    } else if (formName === 'newagentbinaryInfo') {
      return this.newagentbinaryInfo;
    } else if (formName === 'editagentbinaryInfo') {
      return this.editagentbinaryInfo;
    } else if (formName === 'newcrackerversionInfo') {
      return this.newcrackerversionInfo;
    } else if (formName === 'editcrackerversionInfo') {
      return this.editcrackerversionInfo;
    } else if (formName === 'newpreprocessorInfo') {
      return this.newpreprocessorInfo;
    } else if (formName === 'editpreprocessorInfo') {
      return this.editpreprocessorInfo;
    } else if (formName === 'newhashtypeInfo') {
      return this.newhashtypeInfo;
    } else if (formName === 'edithashtypeInfo') {
      return this.edithashtypeInfo;
    } else if (formName === 'newglobalpermissionsgpInfo') {
      return this.newglobalpermissionsgpInfo;
    } else if (formName === 'newaccessgroupsInfo') {
      return this.newaccessgroupsInfo;
    } else if (formName === 'editaccessgroupsInfo') {
      return this.editaccessgroupsInfo;
    } else if (formName === 'newuserInfo') {
      return this.newuserInfo;
    } else {
      return [];
    }
  }

  /**
   * Fetches select options for a form control from an API endpoint.
   *
   * @param apiEndpoint - The API endpoint to retrieve select options from.
   * @returns An observable that emits an array of select options.
   */
  fetchOptions(apiEndpoint: string): Observable<any[]> {
    return this.gs.getAll(apiEndpoint).pipe(
      map((data: any) => {
        console.log(data)
        // Adjust this based on your API response structure
        return data.options.map((option: any) => ({
          label: option.label,
          value: option.value,
        }));
      }),
    );
  }

  // Custom validator to convert the input value to a number
  numberValidator(control: FormControl) {
    const value = control.value;
    if (value === null || value === undefined) {
      return null;
    }
    const parsedValue = Number(value);
    if (isNaN(parsedValue)) {
      return { invalidNumber: true };
    }
    return null;
  }


}
