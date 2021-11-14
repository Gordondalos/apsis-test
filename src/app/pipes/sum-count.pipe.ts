import { Pipe, PipeTransform } from '@angular/core';
import { UserInterface } from '../interfaces/user.interface';
import { map } from 'lodash-es';

@Pipe({
  name: 'sumCount'
})
export class SumCountPipe implements PipeTransform {

  transform(groupId: string, users: UserInterface[]): number {
    let resultCount = 0;
    map(users, user => {
      if (user.team === groupId && user.count) {
        resultCount += user.count;
      }
    });

    return resultCount;
  }

}
