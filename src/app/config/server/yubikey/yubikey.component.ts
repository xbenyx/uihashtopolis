import { Component, OnInit } from '@angular/core';
import { faHomeAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-yubikey',
  templateUrl: './yubikey.component.html',
  styleUrls: ['../../config.component.scss']
})
export class YubikeyComponent implements OnInit {
  faHome=faHomeAlt;

  constructor() { }

  ngOnInit(): void {
  }

}
