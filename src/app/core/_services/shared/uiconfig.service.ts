import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Params } from "@angular/router";
import { Observable, throwError, tap, catchError, take, map } from "rxjs";
import { environment } from './../../../../environments/environment';

import { ConfigService } from '../config/config.service';
import { UIConfig } from '../../_models/config-ui.model';

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

  uiconfigname: Array<any> = ['timefmt','hashcatBrainEnable', 'hashlistAlias', 'blacklistChars', 'chunktime', 'statustimer'];

  public checkUIDefault() {
    const defaults: {_expires: Date } =  JSON.parse(localStorage.getItem('uis'));
    if (defaults) {
        this.checkExpiry();
        return this.defaultSettings;
    } else if (!defaults) {
        this.setUIsettings();
        this.defaultSettings = true;
    }
    return ''
  }

  public checkExpiry(){
    const defaults =  JSON.parse(localStorage.getItem('uis'));
    var date = new Date();
    let currentDate = date.setDate(date.getDate());
    console.log(currentDate)
    let _expires = defaults._expires;
    if(currentDate > _expires){
      this.setUIsettings();
    }
  }

  public setUIsettings(){
    let params = {'maxResults': this.maxResults}
    this.configService.getAllconfig(params).subscribe((result)=>{
      var date = new Date();
      let expirationDate = date.setDate(date.getDate()+1);
      let timefmt = result.values.find(obj => obj.item === 'timefmt').value;
      let enablebrain = result.values.find(obj => obj.item === 'hashcatBrainEnable').value;
      let halias = result.values.find(obj => obj.item === 'hashlistAlias').value;
      let bchars = result.values.find(obj => obj.item === 'blacklistChars').value;
      let ctime = result.values.find(obj => obj.item === 'chunktime').value;
      let stimer = result.values.find(obj => obj.item === 'statustimer').value;

      const uilocal = new UIConfig(timefmt, enablebrain, halias, bchars, ctime, stimer, expirationDate );
      localStorage.setItem('uis', JSON.stringify(uilocal));
    });
  }

  public onUpdatingCheck(name: any){
    if(this.uiconfigname.some(e => e === name)){
      this.setUIsettings();
    }
  }

  public getUIsettings(){
    const uiconfig: {_timefmt: string, _enablebrain: number, _halias: string, _bchars: string, _chunkt: string, _statimer: string  } = JSON.parse(localStorage.getItem('uis'));
    return uiconfig
  }

  private handleError ( err : HttpErrorResponse ) {
    if (err.error instanceof ErrorEvent){
      console.log('Client Side Error: ', err.error.message);
    }else{
      console.log('Server Side Error: ', err);
    }
    return throwError(() => err);
  }

}



