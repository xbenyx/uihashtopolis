import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../core/_services/config/config.service';
import { ActivatedRoute, Params } from '@angular/router';
import { faHomeAlt, faInfoCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html'
})
export class ServerComponent implements OnInit {
  faHome=faHomeAlt;
  faInfoCircle=faInfoCircle;
  faExclamationTriangle=faExclamationTriangle;

  whichView: string;

  constructor(private configService: ConfigService,
    private route:ActivatedRoute) { }

  // public config: {agenttimeout: number, benchtime: number, chunktime: number, chunktimeout: number, fieldseparator: string, hashlistAlias: string, statustime: number, timefmt: string, blacklistChars: string, numLogEntries: number, disptolerance: number, batchSize: number, yubikey_id: string,yubikey_key: string, yubikey_url: string, pagingSize: string, PlaintextMaxLength: number, hashMaxLength: number, emailSender: string, emailSenderName: string, baseHost: string, maxHashlistSize: number, hideImportMasks: number, telegramBotToken: string, contactEmail: string, voucherDeletion: number, hashesPerPage: number, hideIpInfo: number, defaultBenchmark: number, showTaskPerformance: number, ruleSplitSmallTasks: number, ruleSplitAlways: number,ruleSplitDisable: number, agentStatLimit: number, agentDataLifetime: number, agentStatTension: number, multicastEnable: number, multicastDevice: string, multicastTransferRateEnable: number, multicastTranserRate: number, disableTrimming: number, serverLogLevel: number, notificationsProxyEnable: number, notificationsProxyServer: string, notificationsProxyPort: number, notificationsProxyType: string, priority0Start: number, baseUrl: string, maxSessionLength: number,hashcatBrainEnable: number, hashcatBrainHost: string, hashcatBrainPort: number, hashcatBrainPass: string, hashlistImportCheck: number, allowDeregister: number, agentTempThreshold1: number, agentTempThreshold2: number, agentUtilThreshold1: number, agentUtilThreshold2: number, uApiSendTaskIsComplete: number, hcErrorIgnore: string}[] = [];

  public config: {configId: number, configSectionId: number, item: string, value: number}[] = [];

  ngOnInit(): void {

    this.route.data.subscribe(data => {
      switch (data['kind']) {

        case 'agent':
          this.whichView = 'agent';
        break;

        case 'task-chunk':
          this.whichView = 'task-chunk';
        break;

        case 'hch':
          this.whichView = 'hch';
        break;

        case 'notif':
          this.whichView = 'notif';
        break;

        case 'gs':
          this.whichView = 'gs';
        break;


      }

      this.configService.config().subscribe((config: any) => {
        this.config = config;
      });

    });

  }
}
