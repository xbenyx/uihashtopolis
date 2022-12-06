import {
  Directive,
  Input } from '@angular/core';
import {
  NG_VALIDATORS,
  Validator,
  AbstractControl } from '@angular/forms';

@Directive({
  selector: '[validateInputNumber]',
  providers: [{provide: NG_VALIDATORS, useExisting: InputNumberValidator, multi: true}]
})
export class InputNumberValidator implements Validator {

  @Input('validateInputNumber') length: number;

  validate(control: AbstractControl): {[key: string]: any} | null {
    return control.value.toString().length < this.length ? null : { validateFieldNumber: { NotEqual: true }};
  }
}
