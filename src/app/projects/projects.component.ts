import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../core/_services/projects/projects.service';
import { ActivatedRoute, Params } from '@angular/router';
import { faHomeAlt, faPlus, faTrash, faEdit, faFilePdf} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';
// Report Import
import { ReportService } from '../core/_services/config/report.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { ReportConfig } from '../shared/defines/logobase64';
import { InputFiles, Report } from './report';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {
  public isCollapsed = true;
  faHome=faHomeAlt;
  faPlus=faPlus;
  faTrash=faTrash;
  faEdit=faEdit;
  faFilePdf=faFilePdf;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};

  // public projects: {preprocessorId: number}[] = [];
  public projects: any[] = [];

  public project: any[] = [];

  constructor(private projectService:ProjectService, private reportService: ReportService) { }

  ngOnInit(): void {
    this.projectService.projects().subscribe((proj: any) => {
      this.projects = proj;
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

  getStatus(status: string): string{
    if(status == '0')
      return 'Live';
    else if (status == '1')
      return 'Completed';
    else if (status == '2')
      return 'Archived';
    else
      return 'Cancelled';
  }

  // Start Render PDF

  report = new Report();

  public confreport: any[] = [];

  async renderPDF(id: number){
    this.projectService.getProject(id).subscribe((proj: any) => {
      this.project = proj;
      console.log(this.project[0].project_id);
    });

    this.reportService.getConfReport().subscribe((conf: any) => {
      this.confreport = conf;
    });

    var isHeaderAlt:number = 0; // Vairaible for log; O use alternative logo, 1 use hashtopolis logo

    var project = {
      info: {
        title: 'Hashtopolis Report',
        author: 'xbenyx',
        subject: 'Password Recovery Processes',
        },
      pageSize: 'A4',
      pageMargins: [40, 80, 40, 60],
      userPassword: this.project[0].project_report_pass,
      ownerPassword: 'hashtoadmin',
      permissions: {
        printing: 'highResolution', //'lowResolution'
        modifying: false,
        copying: false,
        annotating: true,
        fillingForms: true,
        contentAccessibility: true,
        documentAssembly: true
      },
      header: function(page) {
        if (page != 1 && isHeaderAlt == 1){
            return { columns: [{
                image: ReportConfig.LOGORED
                ,width: 130
                ,margin: [25, 15 , 0, 0]
              }]}
                }
        else if (page != 1 && isHeaderAlt == 0){
            return { columns: [{
                image: ReportConfig.LOGOALT
                ,width: 180
                ,margin: [25, 15 , 0, 0]
              }]}
                }
          else return false;
      },
      footer: function(currentPage, pageCount) {
          return {
              margin:10,
              columns: [
              {
                  fontSize: 9,
                  italic: true,
                  text:[
                  {
                  text: 'Page ' + currentPage.toString() + ' of ' + pageCount,
                  }
                  ],
                  alignment: 'center'
              }
              ]
          };
      },
      background: {
          image: await this.getBase64ImageFromURL("../../assets/img/backgroung.png"), width: 600, margin: [0, 520 , 0, 0]
        },
      content: [
        {
            // image: await this.getBase64ImageFromURL("../../assets/img/letterhead.png"),
            image: await this.getBase64ImageFromURL("../../assets/img/header_2.png"),
            width: 600,
            alignment: 'center',
            margin: [0, -100 , 0, 0],
        },
        '\n\n\n',
        {
          columns: [
            {
              text: this.confreport[0].title_report,
              color: '#00275b',
              bold: true,
              fontSize: 26,
              alignment: 'left',
              margin: [0, 0, 0, 10],
            }
          ],
        },
        {
          columns: [
            {
              text: this.confreport[0].info_cover_body_1,
              color: '#00275b',
              bold: true,
              fontSize: 14,
              alignment: 'left',
              margin: [0, 0, 0, 3],
            }
          ],
        },
        {
          columns: [
            {
              text: this.confreport[0].info_cover_body_2,
              color: '#00275b',
              bold: true,
              fontSize: 14,
              alignment: 'left',
              margin: [0, 0, 0, 3],
            }
          ],
        },
        {
          columns: [
            {
              text: this.project[0].reference,
              color: '#00275b',
              bold: true,
              fontSize: 14,
              alignment: 'left',
              margin: [0, 0, 0, 3],
            }
          ],
        },
        {
          columns: [
            {
              text: this.confreport[0].info_cover_body_3,
              color: '#00275b',
              bold: true,
              fontSize: 14,
              alignment: 'left',
              margin: [0, 0, 0, 3],
            }
          ],
        },
        '\n\n\n\n\n\n',
        {
          columns: [
            {
              text: this.confreport[0].info_cover_body_4,
              color: '#00275b',
              bold: true,
              fontSize: 14,
              alignment: 'left',
              margin: [0, 0, 0, 3],
            }
          ],
        },
        {
          columns: [
            {
              text: this.confreport[0].info_cover_body_5,
              color: '#00275b',
              bold: true,
              fontSize: 14,
              alignment: 'left',
              margin: [0, 0, 0, 3],
            }
          ],
        },
        {
          columns: [
            {
              text: 'The Hague, '+new Date().toDateString(),
              color: '#00275b',
              bold: true,
              fontSize: 14,
              alignment: 'left',
              margin: [0, 0, 0, 3],
            }
          ],
        },
        '\n\n\n\n\n\n\n\n\n\n\n\n\n\n',
        {table: {
          // widths: ['*'],
          body: [
            [
              {
                text: this.confreport[0].info_cover_footer_1,
                color: '#aaaaab',
                border: [true, true, false, true],
                margin: [30, 10, 10, 5],
                fontSize: 9,
                alignment: 'center',
              },
              {
                text: this.confreport[0].info_cover_footer_2,
                border: [false, true, false, true],
                color: '#aaaaab',
                margin: [70, 10, 10, 5],
                fontSize: 9,
                alignment: 'center',
              },
              {
                text: this.confreport[0].info_cover_footer_3,
                border: [false, true, true, true],
                color: '#aaaaab',
                margin: [70, 10, 10, 5],
                fontSize: 9,
                alignment: 'center',
              },
            ],
          ]
         }
        },
        // '\n\n',
        {columns: [
              {
                text: 'Project Description',
                color: '#00275b',
                bold: true,
                fontSize: 14,
                alignment: 'left',
                margin: [0, 0, 0, 3],
                pageBreak: 'before'
              }
          ],
        },
        '\n',
        // this.getInputFilesObject(this.resume.educations),
        {columns: [
          {
            text: this.project[0].project_description,
            color: '#000000',
            bold: true,
            fontSize: 12,
            alignment: 'left',
            margin: [0, 0, 0, 3],
          }
          ],
        },
        '\n\n',
        {columns: [
          {
            text: 'Input Files',
            color: '#00275b',
            bold: true,
            fontSize: 14,
            alignment: 'left',
            margin: [0, 0, 0, 3],
          }
          ],
        },
        '\n',
        {
          layout: {
            defaultBorder: false,
            hLineWidth: function(i, node) {
              return 1;
            },
            vLineWidth: function(i, node) {
              return 1;
            },
            hLineColor: function(i, node) {
              if (i === 1 || i === 0) {
                return '#bfdde8';
              }
              return '#eaeaea';
            },
            vLineColor: function(i, node) {
              return '#eaeaea';
            },
            hLineStyle: function(i, node) {
              // if (i === 0 || i === node.table.body.length) {
              return null;
              //}
            },
            // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
            paddingLeft: function(i, node) {
              return 10;
            },
            paddingRight: function(i, node) {
              return 10;
            },
            paddingTop: function(i, node) {
              return 2;
            },
            paddingBottom: function(i, node) {
              return 2;
            },
            fillColor: function(rowIndex, node, columnIndex) {
              return '#fff';
            },
          },
          table: {
            headerRows: 1,
            body: [
              [
                {
                  text: 'Reference Name',
                  fillColor: '#eaf2f5',
                  border: [false, true, false, true],
                  margin: [0, 5, 0, 5],
                  textTransform: 'uppercase',
                },
                {
                  text: 'Hash Mode',
                  border: [false, true, false, true],
                  alignment: 'right',
                  fillColor: '#eaf2f5',
                  margin: [0, 5, 0, 5],
                  textTransform: 'uppercase',
                },
                {
                  text: 'Hash Count',
                  border: [false, true, false, true],
                  alignment: 'right',
                  fillColor: '#eaf2f5',
                  margin: [0, 5, 0, 5],
                  textTransform: 'uppercase',
                },
                {
                  text: 'Retrieved',
                  border: [false, true, false, true],
                  alignment: 'right',
                  fillColor: '#eaf2f5',
                  margin: [0, 5, 0, 5],
                  textTransform: 'uppercase',
                },
                {
                  text: 'Keyspace explored',
                  border: [false, true, false, true],
                  alignment: 'right',
                  fillColor: '#eaf2f5',
                  margin: [0, 5, 0, 5],
                  textTransform: 'uppercase',
                },
              ],
              [
                {
                  text: 'cyrborg_robocot',
                  border: [false, false, false, true],
                  margin: [0, 5, 0, 5],
                  alignment: 'center',
                },
                {
                  border: [false, false, false, true],
                  text: '3200',
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
                {
                  border: [false, false, false, true],
                  text: '1',
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
                {
                  border: [false, false, false, true],
                  text: '0',
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
                {
                  border: [false, false, false, true],
                  text: '17,071,868,064',
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
              ],
            ],
          },
        },
        '\n',
        {columns: [
          {
            text: 'Process Performed',
            color: '#00275b',
            bold: true,
            fontSize: 14,
            alignment: 'left',
            margin: [0, 0, 0, 3],
          }
          ],
        },
        '\n',
      ],
      styles: {
        notesTitle: {
          fontSize: 10,
          bold: true,
          margin: [0, 50, 0, 3],
        },
        notesText: {
          fontSize: 10,
        },
      },
      defaultStyle: {
        columnGap: 20,
      },
    };

    pdfMake.createPdf(project).open();
   }

   getInputFilesObject(inpfiles: InputFiles[]) {
    return {
      table: {
        headerRows: 1,
        body: [
          [
            {
              text: 'Reference Name',
              fillColor: '#eaf2f5',
              border: [false, true, false, true],
              margin: [0, 5, 0, 5],
              textTransform: 'uppercase',
            },
            {
              text: 'Hash Mode',
              border: [false, true, false, true],
              alignment: 'right',
              fillColor: '#eaf2f5',
              margin: [0, 5, 0, 5],
              textTransform: 'uppercase',
            },
            {
              text: 'Hash Count',
              border: [false, true, false, true],
              alignment: 'right',
              fillColor: '#eaf2f5',
              margin: [0, 5, 0, 5],
              textTransform: 'uppercase',
            },
            {
              text: 'Retrieved',
              border: [false, true, false, true],
              alignment: 'right',
              fillColor: '#eaf2f5',
              margin: [0, 5, 0, 5],
              textTransform: 'uppercase',
            },
            {
              text: 'Keyspace explored',
              border: [false, true, false, true],
              alignment: 'right',
              fillColor: '#eaf2f5',
              margin: [0, 5, 0, 5],
              textTransform: 'uppercase',
            }
          ],
          ...inpfiles.map(ed => {
            return [ed.name, ed.hashtypeId, ed.hashCount, ed.cracked, ed.dispatched_keyspace];
          })
        ]
      }
    };
  }

  //  Function creates converts the image in base64, so can be used in the report
  getBase64ImageFromURL(url: string) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;

    });}
  // End Render PDF

}
