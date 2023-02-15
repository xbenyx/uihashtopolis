import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from './../../../environments/environment';
import { faHomeAlt, faInfoCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { ConfigService } from '../../core/_services/config/config.service';
import { CookieService } from '../../core/_services/cookies.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html'
})
export class ServerComponent implements OnInit {

  faHome=faHomeAlt;
  faInfoCircle=faInfoCircle;
  faExclamationTriangle=faExclamationTriangle;
  isLoading = false;

  whichView: string;

  constructor(
    private configService: ConfigService,
    private cookieService: CookieService,
    private route:ActivatedRoute,
  ) { }

  private maxResults = environment.config.prodApiMaxResults;

  // public config: {agenttimeout: number, benchtime: number, chunktime: number, chunktimeout: number, fieldseparator: string, hashlistAlias: string, statustime: number, timefmt: string, blacklistChars: string, numLogEntries: number, disptolerance: number, batchSize: number, yubikey_id: string,yubikey_key: string, yubikey_url: string, pagingSize: string, PlaintextMaxLength: number, hashMaxLength: number, emailSender: string, emailSenderName: string, baseHost: string, maxHashlistSize: number, hideImportMasks: number, telegramBotToken: string, contactEmail: string, voucherDeletion: number, hashesPerPage: number, hideIpInfo: number, defaultBenchmark: number, showTaskPerformance: number, ruleSplitSmallTasks: number, ruleSplitAlways: number,ruleSplitDisable: number, agentStatLimit: number, agentDataLifetime: number, agentStatTension: number, multicastEnable: number, multicastDevice: string, multicastTransferRateEnable: number, multicastTranserRate: number, disableTrimming: number, serverLogLevel: number, notificationsProxyEnable: number, notificationsProxyServer: string, notificationsProxyPort: number, notificationsProxyType: string, priority0Start: number, baseUrl: string, maxSessionLength: number,hashcatBrainEnable: number, hashcatBrainHost: string, hashcatBrainPort: number, hashcatBrainPass: string, hashlistImportCheck: number, allowDeregister: number, agentTempThreshold1: number, agentTempThreshold2: number, agentUtilThreshold1: number, agentUtilThreshold2: number, uApiSendTaskIsComplete: number, hcErrorIgnore: string}[] = [];

  public config: {configId: number, configSectionId: number, item: string, value: number}[] = [];

  agentForm: FormGroup;
  tcForm: FormGroup;
  hchForm: FormGroup;
  notifForm: FormGroup;
  gsForm: FormGroup;

  serverlog = [{id:0, value: 'TRACE'},{id:10, value: 'DEBUG'},{id:20, value: 'INFO'},{id:30, value: 'WARNING'},{id:40, value: 'ERROR'},{id:50, value: 'FATAL'}];
  proxytype = [{value:'HTTP'},{value:'HTTPS'},{value:'SOCKS4'},{value:'SOCKS5'}];
  dateFormat = [
    {format:'dd/MM/yyyy h:mm:ss', description:'06/07/2023, 9:03 AM (dd/MM/yyyy h:mm:ss)'},
    {format:'M/d/yy, h:mm a', description:'7/6/23, 9:03 AM (M/d/yy, h:mm a)'},
    {format:'MMM d, y, h:mm:ss a', description:'Jul 06, 2023, 9:03:01 AM (MMM d, y, h:mm:ss a)'},
    {format:'M/d/yy', description:'7/6/23 (M/d/yy)'},
  ];

  ngOnInit(): void {

    this.route.data.subscribe(data => {
      switch (data['kind']) {

        case 'agent':
          this.whichView = 'agent';
          this.agentForm = new FormGroup({
            'agenttimeout': new FormControl(),
            'benchtime': new FormControl(),
            'statustimer': new FormControl(),
            'agentDataLifetime': new FormControl(),
            'hideIpInfo': new FormControl(),
            'voucherDeletion': new FormControl(),
            'agentStatLimit': new FormControl(),
            'agentStatTension': new FormControl(),
            'agentTempThreshold1': new FormControl(),
            'agentTempThreshold2': new FormControl(),
            'agentUtilThreshold1': new FormControl(),
            'agentUtilThreshold2': new FormControl(),
          });
          this.initAgentForm();
        break;

        case 'task-chunk':
          this.whichView = 'task-chunk';
          this.tcForm = new FormGroup({
            'chunktime': new FormControl(),
            'disptolerance': new FormControl(),
            'defaultBenchmark': new FormControl(),
            'disableTrimming': new FormControl(),
            'hashlistAlias': new FormControl(),
            'blacklistChars': new FormControl(),
            'priority0Start': new FormControl(),
            'ruleSplitSmallTasks': new FormControl(),
            'ruleSplitAlways': new FormControl(),
            'ruleSplitDisable': new FormControl()
          });
          this.initTCForm();
        break;

        case 'hch':
          this.whichView = 'hch';
          this.hchForm = new FormGroup({
            'maxHashlistSize': new FormControl(),
            'pagingSize': new FormControl(),
            'hashesPerPage': new FormControl(),
            'fieldseparator': new FormControl(),
            'hashlistImportCheck': new FormControl(),
            'batchSize': new FormControl(),
            'plainTextMaxLength': new FormControl(),
            'hashMaxLength': new FormControl(),
          });
          this.initHCHForm();
        break;

        case 'notif':
          this.whichView = 'notif';
          this.notifForm = new FormGroup({
            'emailSender': new FormControl(),
            'emailSenderName': new FormControl(),
            'telegramBotToken': new FormControl(),
            'notificationsProxyEnable': new FormControl(),
            'notificationsProxyServer': new FormControl(),
            'notificationsProxyPort': new FormControl(),
            'notificationsProxyType': new FormControl(),
          });
          this.initNotifForm();
        break;

        case 'gs':
          this.whichView = 'gs';
          this.gsForm = new FormGroup({
            'hashcatBrainEnable': new FormControl(),
            'hashcatBrainHost': new FormControl(),
            'hashcatBrainPort': new FormControl(),
            'hashcatBrainPass': new FormControl(),
            'hcErrorIgnore': new FormControl(),
            'numLogEntries': new FormControl(),
            'timefmt': new FormControl(),
            'maxSessionLength': new FormControl(),
            'baseHost': new FormControl(),
            'contactEmail': new FormControl(),
            'serverLogLevel': new FormControl(),
          });
          this.initGSForm();
        break;


      }

    });

  }

  private initAgentForm() {
    this.isLoading = true;
    this.getTooltipLevel()
    let params = {'maxResults': this.maxResults}
    this.configService.getAllconfig(params).subscribe((result)=>{
      this.agentForm = new FormGroup({
        'agenttimeout': new FormControl(result.values.find(obj => obj.item === 'agenttimeout').value),
        'benchtime': new FormControl(result.values.find(obj => obj.item === 'benchtime').value),
        'statustimer': new FormControl(result.values.find(obj => obj.item === 'statustimer').value),
        'agentDataLifetime': new FormControl(result.values.find(obj => obj.item === 'agentDataLifetime').value),
        'hideIpInfo': new FormControl(result.values.find(obj => obj.item === 'hideIpInfo').value === '0' ? false: true),
        'voucherDeletion': new FormControl((result.values.find(obj => obj.item === 'voucherDeletion').value) === '0' ? false: true),
        'agentStatLimit': new FormControl(result.values.find(obj => obj.item === 'agentStatLimit').value),
        'agentStatTension': new FormControl(+result.values.find(obj => obj.item === 'agentStatTension').value),
        'agentTempThreshold1': new FormControl(result.values.find(obj => obj.item === 'agentTempThreshold1').value),
        'agentTempThreshold2': new FormControl(result.values.find(obj => obj.item === 'agentTempThreshold2').value),
        'agentUtilThreshold1': new FormControl(result.values.find(obj => obj.item === 'agentUtilThreshold1').value),
        'agentUtilThreshold2': new FormControl(result.values.find(obj => obj.item === 'agentUtilThreshold2').value),
      });
      this.isLoading = false;
    });
  }

  private initTCForm() {
    this.isLoading = true;
    let params = {'maxResults': this.maxResults}
    this.configService.getAllconfig(params).subscribe((result)=>{
      this.tcForm = new FormGroup({
        'chunktime': new FormControl(result.values.find(obj => obj.item === 'chunktime').value),
        'disptolerance': new FormControl(result.values.find(obj => obj.item === 'disptolerance').value),
        'defaultBenchmark': new FormControl(result.values.find(obj => obj.item === 'defaultBenchmark').value  === '0' ? false: true),
        'disableTrimming': new FormControl(result.values.find(obj => obj.item === 'disableTrimming').value  === '0' ? false: true),
        'hashlistAlias': new FormControl(result.values.find(obj => obj.item === 'hashlistAlias').value ),
        'blacklistChars': new FormControl(result.values.find(obj => obj.item === 'blacklistChars').value),
        'priority0Start': new FormControl(result.values.find(obj => obj.item === 'priority0Start').value === '0' ? false: true),
        'showTaskPerformance': new FormControl(result.values.find(obj => obj.item === 'showTaskPerformance').value  === '0' ? false: true),
        'ruleSplitSmallTasks': new FormControl(result.values.find(obj => obj.item === 'ruleSplitSmallTasks').value === '0' ? false: true),
        'ruleSplitAlways': new FormControl(result.values.find(obj => obj.item === 'ruleSplitAlways').value === '0' ? false: true),
        'ruleSplitDisable': new FormControl((result.values.find(obj => obj.item === 'ruleSplitDisable').value) === '0' ? false: true)
      });
      this.isLoading = false;
    });
  }

  private initHCHForm() {
    this.isLoading = true;
    let params = {'maxResults': this.maxResults}
    this.configService.getAllconfig(params).subscribe((result)=>{
      this.hchForm = new FormGroup({
        'maxHashlistSize': new FormControl(result.values.find(obj => obj.item === 'maxHashlistSize').value),
        'pagingSize': new FormControl(result.values.find(obj => obj.item === 'pagingSize').value),
        'hashesPerPage': new FormControl(result.values.find(obj => obj.item === 'hashesPerPage').value),
        'fieldseparator': new FormControl(result.values.find(obj => obj.item === 'fieldseparator').value),
        'hashlistImportCheck': new FormControl(result.values.find(obj => obj.item === 'hashlistImportCheck').value),
        'batchSize': new FormControl(result.values.find(obj => obj.item === 'batchSize').value),
        'plainTextMaxLength': new FormControl(result.values.find(obj => obj.item === 'plainTextMaxLength').value),
        'hashMaxLength': new FormControl(result.values.find(obj => obj.item === 'hashMaxLength').value),
      });
      this.isLoading = false;
    });
  }

  private initNotifForm() {
    this.isLoading = true;
    let params = {'maxResults': this.maxResults}
    this.configService.getAllconfig(params).subscribe((result)=>{
      this.notifForm = new FormGroup({
        'emailSender': new FormControl(result.values.find(obj => obj.item === 'emailSender').value),
        'emailSenderName': new FormControl(result.values.find(obj => obj.item === 'emailSenderName').value),
        'telegramBotToken': new FormControl(result.values.find(obj => obj.item === 'telegramBotToken').value),
        'notificationsProxyEnable': new FormControl(result.values.find(obj => obj.item === 'notificationsProxyEnable').value === '0' ? false: true),
        'notificationsProxyServer': new FormControl(result.values.find(obj => obj.item === 'notificationsProxyServer').value),
        'notificationsProxyPort': new FormControl(result.values.find(obj => obj.item === 'notificationsProxyPort').value),
        'notificationsProxyType': new FormControl(result.values.find(obj => obj.item === 'notificationsProxyType').value),
      });
      this.isLoading = false;
    });
  }

  private initGSForm() {
    this.isLoading = true;
    let params = {'maxResults': this.maxResults}
    this.configService.getAllconfig(params).subscribe((result)=>{
      this.gsForm = new FormGroup({
        'hashcatBrainEnable': new FormControl(result.values.find(obj => obj.item === 'hashcatBrainEnable').value === '0' ? false: true),
        'hashcatBrainHost': new FormControl(result.values.find(obj => obj.item === 'hashcatBrainHost').value),
        'hashcatBrainPort': new FormControl(result.values.find(obj => obj.item === 'hashcatBrainPort').value),
        'hashcatBrainPass': new FormControl(result.values.find(obj => obj.item === 'hashcatBrainPass').value),
        'hcErrorIgnore': new FormControl(result.values.find(obj => obj.item === 'hcErrorIgnore').value),
        'numLogEntries': new FormControl(result.values.find(obj => obj.item === 'numLogEntries').value),
        'timefmt': new FormControl(result.values.find(obj => obj.item === 'timefmt').value),
        'maxSessionLength': new FormControl(result.values.find(obj => obj.item === 'maxSessionLength').value),
        'baseHost': new FormControl(result.values.find(obj => obj.item === 'baseHost').value),
        'contactEmail': new FormControl(result.values.find(obj => obj.item === 'contactEmail').value),
        'serverLogLevel': new FormControl(result.values.find(obj => obj.item === 'serverLogLevel').value),
      });
      this.isLoading = false;
    });
  }

  // Auto Save Settings

  searchTxt:string = '';
  timeout = null;

  autoSave(key: string, value: any, sw?: boolean, collap?: boolean){
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
    this.isLoading = true;
    let params = {'filter=item': key};
    this.configService.getAllconfig(params).subscribe((result)=>{
      let indexUpdate = result.values.find(obj => obj.item === key).configId;
      let valueUpdate = result.values.find(obj => obj.item === key).value;
      let arr = {'item': key, 'value':  this.checkSwitch(value, valueUpdate, sw)};
      this.configService.updateConfig(indexUpdate, arr).subscribe((result)=>{
        if(collap === true){
        this.isLoading = false;
        }else{
          this.saveAlert();
          this.ngOnInit();
        }
      });
    });
   }, 1500);
  }

  checkSwitch(value: any, ovalue: any, sw?: boolean){
    if(sw == true && ovalue === '1'){
      return '0';
    }if(sw == true && ovalue === '0') {
      return '1';
    }else {
      return value;
    }
  }

  getTooltipLevel(){
    return this.cookieService.getCookie('tooltip');
  }

  setTooltipLevel(value: string){
    // 0 consise, 1 precise, 2 thorough
    this.cookieService.setCookie('tooltip', value, 365);
    this.saveAlert();
  }

  saveAlert(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Setting change has been saved',
      showConfirmButton: false,
      timer: 1500
    })
  }

}
