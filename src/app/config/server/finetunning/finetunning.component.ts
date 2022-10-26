import { Component, OnInit } from '@angular/core';
import { faHomeAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-finetunning',
  templateUrl: './finetunning.component.html'
})
export class FinetunningComponent implements OnInit {
  faHome=faHomeAlt;

  constructor() { }

  ngOnInit(): void {
  }

}
