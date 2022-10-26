import { Component, OnInit, OnDestroy } from '@angular/core';
import { BinaryService } from '../../service/shared/binary.service';
import { faTrash, faHomeAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-binaries',
  templateUrl: './binaries.component.html'
})
export class BinariesComponent implements OnInit, OnDestroy {
  faTrash=faTrash;
  faHome=faHomeAlt;
  faPlus=faPlus;

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
      select: true
    };
  }
}
