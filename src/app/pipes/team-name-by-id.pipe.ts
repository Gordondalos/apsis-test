import { Pipe, PipeTransform } from '@angular/core';
import { TeamInterface } from '../interfaces/team.interface';

@Pipe({
  name: 'teamNameById'
})
export class TeamNameByIdPipe implements PipeTransform {

  transform(value: string | undefined, teams: TeamInterface[]): string {

    if (!value || !teams) {
      return '';
    }
    const team: TeamInterface | undefined = teams.find((t) => t.id === value);

    return team && team.name ? team.name : '';

  }

}
