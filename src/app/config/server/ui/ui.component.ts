import { Component, OnInit } from '@angular/core';
import { faHomeAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html'
})
export class UiComponent implements OnInit {
  faHome=faHomeAlt;

  constructor() { }

  ngOnInit(): void {
  }

}
