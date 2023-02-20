import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'loadUsername'
})
export class LoadUsernamePipe implements PipeTransform {

  // constructor(params) {

  // }

  transform(username: string, placeholder: string): unknown {
    let realUsername = username ? username : placeholder;
    return realUsername;
  }
}
