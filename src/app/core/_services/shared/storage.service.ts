import { environment } from '../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { ConfigService } from '../config/config.service';
import { IStorage } from '../../_models/config-ui.model';

@Injectable({
  providedIn: 'root'
})
export class UIConfigService {

  defaultSettings = false;

  constructor(
    private http: HttpClient,
    private configService:ConfigService
  ) {}

  private maxResults = environment.config.prodApiMaxResults;

  cachevar= [
    {name:'timefmt'},
    {name:'hashcatBrainEnable'},
    {name:'hashlistAlias'},
    {name:'blacklistChars'},
    {name:'chunktime'},
    {name:'agentStatLimit'},
    {name:'agentStatTension'},
    {name:'agentTempThreshold1'},
    {name:'agentTempThreshold2'},
    {name:'agentUtilThreshold1'},
    {name:'agentUtilThreshold2'},
    {name:'statustimer'},
    {name:'agenttimeout'}
  ];
  cexprity: number = 24*60*60; // Hours*minutes*Seconds

  public checkStorage() {
    const defaults =  JSON.parse(localStorage.getItem('uis'));
    if (defaults) {  //Change to !defaults
        this.checkExpiry();
        return this.defaultSettings;
    } else if (!defaults) {
        this.storeDefault();
        this.defaultSettings = true;
    }
    return ''
  }

  public checkExpiry(){
    const timestamp =  this.getUIsettings('_timestamp').value || 0;
    const expires =  this.getUIsettings('_expiresin').value || 0;
    if(Date.now() - timestamp < expires){
      this.storeDefault();
    }
  }

  public storeDefault(){
    let params = {'maxResults': this.maxResults}
    this.configService.getAllconfig(params).subscribe((result)=>{

      var post_data = [];

      this.cachevar.forEach((data) => {
        let name = data.name;
        let value = result.values.find(obj => obj.item === data.name).value;
        value = {name:name, value: value}
        post_data.push(value);
      });
      let timeinfo = [{name: '_timestamp', value: Date.now()},{name: '_expiresin', value: this.cexprity}];

      localStorage.setItem('uis', JSON.stringify([].concat(post_data,timeinfo)));
    });
  }

  public onUpdatingCheck(name: any){
    if(this.cachevar.some(e => e.name === name)){
      this.storeDefault();
    }
  }

  public getUIsettings(name?: string){
    const uiconfig = JSON.parse(localStorage.getItem('uis'));
    if (!uiconfig) {
      return null;
    }
    return uiconfig.find(o => o.name === name);
  }



}








