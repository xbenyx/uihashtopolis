import { faInfoCircle, faUserSecret, faTasks, faTasksAlt, faChainBroken, faCalendarWeek, faCalendarDay, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { environment } from 'src/environments/environment';
import { Component, ElementRef, Input, OnInit } from '@angular/core';

import { AgentsService } from '../core/_services/agents/agents.service';
import { interval, Subscription } from 'rxjs';
import { TasksService } from '../core/_services/tasks/tasks.sevice';
import { HashesService } from '../core/_services/hashlist/hashes.service';

import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption
} from 'echarts/components';
import { ScatterChart, ScatterSeriesOption } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  title = 'Hastopolis';
  username: string = 'Admin';

  faCalendarWeek=faCalendarWeek;
  faChainBroken=faChainBroken;
  faCheckCircle=faCheckCircle;
  faCalendarDay=faCalendarDay;
  faInfoCircle=faInfoCircle;
  faUserSecret=faUserSecret;
  faTasksAlt=faTasksAlt;
  faTasks=faTasks;

  faGithub=faGithub;

  getUsername(){
      return this.username;
  }

  // Dashboard variables
  activeAgents: number = 0;
  totalAgents: number = 0;
  totalTasks: number = 0;
  totalCracks: number = 0;

  private maxResults = environment.config.prodApiMaxResults;
  private updateSubscription: Subscription;
  public punchCardOpts = {}
  public punchCardOptss = {}

  constructor(
    private agentsService: AgentsService,
    private hashesService: HashesService,
    private tasksService: TasksService,
    private elementRef: ElementRef
  ) { }

  async ngOnInit(): Promise<void> {

    this.initData();
    this.updateSubscription = interval(300000).subscribe(
      (val) => { this.initData()});

  }

  async initData() {

    // Agents
    let params = {'maxResults': this.maxResults}

    this.agentsService.getAgents(params).subscribe((agents: any) => {
      this.totalAgents = agents.total | 0;
      this.activeAgents = agents.values.filter(u=> u.isActive == true).length | 0;
    });

    //  Tasks
    let paramst = {'maxResults': this.maxResults, 'filter': 'isArchived=false'}

    this.tasksService.getAlltasks(paramst).subscribe((tasks: any) => {
      this.totalTasks = tasks.values.filter(u=> u.isArchived != true).length | 0;
    });

    // Cracks
    // let paramsc = {'maxResults': this.maxResults, 'filter': 'isCracked='+true+''}
    let paramsc = {'maxResults': this.maxResults }

    this.hashesService.getAllhashes(paramsc).subscribe((hashes: any) => {
      let lastseven:any = new Date() ;
      lastseven = lastseven.setDate(lastseven.getDate() - 7).valueOf()/1000;
      let lastsevenObject = hashes.values.filter(u=> (u.isCracked == true && u.timeCracked > lastseven ));
      this.totalCracks = lastsevenObject.length | 0;
      this.initPunchCard(lastsevenObject);
    });

  }

  // Graphs Section
  convert(t) {
    const dt = new Date(t);
    const hr = dt.getUTCHours();
    return hr
  }

  initPunchCard(obj: any){

    let date_today = new Date();
    let first_day_of_the_week = new Date(date_today.setDate(date_today.getDate() - date_today.getDay() ));
    let epochtime = first_day_of_the_week.setDate(first_day_of_the_week.getDate()).valueOf()/1000;

    let filterdate = obj.filter(u=> (u.isCracked == true && u.timeCracked > epochtime ));

    var arr = [];
    for(let i=0; i < filterdate.length; i++){
      arr.push(Math.floor((filterdate[i]['timeCracked']+ 345_600_000) / 604_800_000), Math.floor(filterdate[i]['timeCracked']% 86400 / 3600));
    }
    var sum = arr.reduce((a, i) => a + i, 0);

    echarts.use([
      TitleComponent,
      TooltipComponent,
      GridComponent,
      LegendComponent,
      ScatterChart,
      CanvasRenderer,
      UniversalTransition
    ]);

    type EChartsOption = echarts.ComposeOption<
      | TitleComponentOption
      | TooltipComponentOption
      | GridComponentOption
      | LegendComponentOption
      | ScatterSeriesOption
    >;

    var chartDom = document.getElementById('pcard')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;

    const hours = [
        '12a', '1a', '2a', '3a', '4a', '5a', '6a',
        '7a', '8a', '9a','10a','11a',
        '12p', '1p', '2p', '3p', '4p', '5p',
        '6p', '7p', '8p', '9p', '10p', '11p'
      ];

    const days = [
        'Saturday', 'Friday', 'Thursday',
        'Wednesday', 'Tuesday', 'Monday', 'Sunday'
      ];

    const data = [[0,6,10],[0,1,1],[0,2,0],[0,3,0],[0,4,0],[0,5,0],[0,6,0],[0,7,0],[0,8,0],[0,9,0],[0,10,0],[0,11,2],[0,12,4],[0,13,1],[0,14,1],[0,15,3],[0,16,4],[0,17,6],[0,18,4],[0,19,4],[0,20,3],[0,21,3],[0,22,2],[0,23,5],[1,0,7],[1,1,0],[1,2,0],[1,3,0],[1,4,0],[1,5,0],[1,6,0],[1,7,0],[1,8,0],[1,9,0],[1,10,5],[1,11,2],[1,12,2],[1,13,6],[1,14,9],[1,15,11],[1,16,6],[1,17,7],[1,18,8],[1,19,12],[1,20,5],[1,21,5],[1,22,7],[1,23,2],[2,0,1],[2,1,1],[2,2,0],[2,3,0],[2,4,0],[2,5,0],[2,6,0],[2,7,0],[2,8,0],[2,9,0],[2,10,3],[2,11,2],[2,12,1],[2,13,9],[2,14,8],[2,15,10],[2,16,6],[2,17,5],[2,18,5],[2,19,5],[2,20,7],[2,21,4],[2,22,2],[2,23,4],[3,0,7],[3,1,3],[3,2,0],[3,3,0],[3,4,0],[3,5,0],[3,6,0],[3,7,0],[3,8,1],[3,9,0],[3,10,5],[3,11,4],[3,12,7],[3,13,14],[3,14,13],[3,15,12],[3,16,9],[3,17,5],[3,18,5],[3,19,10],[3,20,6],[3,21,4],[3,22,4],[3,23,1],[4,0,1],[4,1,3],[4,2,0],[4,3,0],[4,4,0],[4,5,1],[4,6,0],[4,7,0],[4,8,0],[4,9,2],[4,10,4],[4,11,4],[4,12,2],[4,13,4],[4,14,4],[4,15,14],[4,16,12],[4,17,1],[4,18,8],[4,19,5],[4,20,3],[4,21,7],[4,22,3],[4,23,0],[5,0,2],[5,1,1],[5,2,0],[5,3,3],[5,4,0],[5,5,0],[5,6,0],[5,7,0],[5,8,2],[5,9,0],[5,10,4],[5,11,1],[5,12,5],[5,13,10],[5,14,5],[5,15,7],[5,16,11],[5,17,6],[5,18,0],[5,19,5],[5,20,3],[5,21,4],[5,22,2],[5,23,0],[6,0,1],[6,1,0],[6,2,0],[6,3,0],[6,4,0],[6,5,0],[6,6,0],[6,7,0],[6,8,0],[6,9,0],[6,10,1],[6,11,0],[6,12,2],[6,13,1],[6,14,3],[6,15,4],[6,16,0],[6,17,0],[6,18,0],[6,19,0],[6,20,1],[6,21,2],[6,22,2],[6,23,6]]
        .map(function (item) {
            return [item[1], item[0], item[2]];
        });

    option = {
      title: {
        text: '',
        link: ''
      },
      tooltip: {
        position: 'top',
        formatter: function (params) {
          return params.value[2] + ' cracks at ' + hours[params.value[0]] + ' of ' + days[params.value[1]]
        }
      },
      grid: {
        left: 2,
        bottom: 10,
        right: 10,
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: hours,
        boundaryGap: false,
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed'
          }
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          fontSize: 10,
        }
      },
      yAxis: {
        type: 'category',
        data: days,
        axisLine: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed'
          }
        },
        axisLabel: {
          fontSize: 10,
        }
      },
      series: [
        {
          name: 'Punch Card',
          type: 'scatter',
          symbolSize: function (val) {
            return val[2] * 2;
          },
          data: data,
          animationDelay: function (idx) {
            return idx * 5;
          }
        }
      ]
    };

    option && myChart.setOption(option);

  }

}

