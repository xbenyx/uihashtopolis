import { Component, OnInit, OnDestroy } from '@angular/core';
import { BinaryService } from '../../service/shared/binary.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-new-agent',
  templateUrl: './new-agent.component.html',
  styleUrls: ['./new-agent.component.scss']
})
export class NewAgentComponent implements OnInit, OnDestroy {

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  crackerbinary: any = [];
  constructor(private binaryService: BinaryService) { }

  ngOnInit(): void {
    this.binaryService.crackerBinary().subscribe((binary: any) => {
      this.crackerbinary = binary;
      this.dtTrigger.next(void 0);
    });
    this.dtOptions = {
      dom: 'Bfrtip',
      pageLength: 10,
      stateSave: true,
      select: true,
      buttons: [
        'copy', 'excel', 'csv', 'edit'
    ]
    };
  }
}
