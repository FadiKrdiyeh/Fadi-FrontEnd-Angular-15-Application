import { Pipe, PipeTransform } from '@angular/core';

type stnum = string | number;

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
