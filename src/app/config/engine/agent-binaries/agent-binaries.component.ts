import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { faHomeAlt, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import { AgentBinService } from '../../../core/_services/config/agentbinary.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-agent-binaries',
  templateUrl: './agent-binaries.component.html'
})
export class AgentBinariesComponent implements OnInit {
  public isCollapsed = true;
  faHome=faHomeAlt;
  faPlus=faPlus;
  faTrash=faTrash;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};

  public binaries: {agentBinaryId: number, type: string, version: string, operatingSystems: string, filename: string, updateTrack: string, updateAvailable: string}[] = [];

  constructor(private agentBinService: AgentBinService,
    private route:ActivatedRoute, private router:Router) { }

    ngOnInit(): void {

      this.agentBinService.getAgentBin().subscribe((bin: any) => {
        this.binaries = bin;
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

    onSubmit(){
      Swal.fire({
        title: "Good job!",
        text: "New Binary created!",
        icon: "success",
        button: "Close",
      });
    }

    onDelete(id: number){
      Swal.fire({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        showCancelButton: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          Swal.fire(
            "File has been deleted!",
            {
            icon: "success",
          });
        } else {
          Swal.fire("Your imaginary file is safe!")
        }
      });
    }


}
