import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-filter-box',
  templateUrl: './filter-box.component.html'
})
export class FilterBoxComponent {

  model: { filter: string } = { filter: '' };

  @Output()
  changed: EventEmitter<string> = new EventEmitter<string>();

  filterChanged(event: any) {
    event.preventDefault();
    this.changed.emit(this.model.filter); // Raise changed event
  }
}
