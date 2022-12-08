import {
  Directive,
  HostListener,
  HostBinding,
  Output,
  EventEmitter
} from '@angular/core';

/*
 * Cetects when a file is hovered or dropped
 * Usage:
 *   value | fileDrop
 * Example:
 *     fileDrop >
 *   console: detects when a file is hovered or dropped
*/

@Directive({
  selector: '[fileDrop]'
})
export class FileDropDirective {

  @Output() dropped =  new EventEmitter<FileList>();
  @Output() hovered =  new EventEmitter<boolean>();

  constructor() { }

  @HostListener('drop', ['$event'])
  onDrop($event) {
    $event.preventDefault();
    this.dropped.emit($event.dataTransfer.files);
    this.hovered.emit(false);
  }

  @HostListener('dragover', ['$event'])
  onDragOver($event) {
    $event.preventDefault();
    this.hovered.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave($event) {
    this.hovered.emit(false);
  }


}
