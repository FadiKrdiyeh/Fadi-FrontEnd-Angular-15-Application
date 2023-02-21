import { Pipe, PipeTransform } from '@angular/core';

type stnum = string | number;

/**
 * Custom pipe for show a placeholder text when loading from request like username in header, count employees in department details, etc...
 *
 * @export
 * @class LoadTextPipe
 * @implements {PipeTransform}
 */
@Pipe({
  name: 'loadText'
})
export class LoadTextPipe implements PipeTransform {

  // constructor(params) {

  // }

  transform(mainText: stnum, placeholder: stnum): stnum {
    let text = mainText ? mainText : placeholder;
    return text;
  }
}
