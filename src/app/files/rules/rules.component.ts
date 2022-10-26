import { Component, OnInit } from '@angular/core';
import { faTrash, faHomeAlt, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html'
})
export class RulesComponent implements OnInit {
  faTrash=faTrash;
  faHome=faHomeAlt;
  faPlus=faPlus;

  constructor() { }

  ngOnInit(): void {
  }

}
