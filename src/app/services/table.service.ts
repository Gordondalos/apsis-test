import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TeamInterface } from '../interfaces/team.interface';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  constructor(
    private http: HttpClient,
  ) {
  }

  /*
  * Данная функция должна возвращать данные с бекенда
  * */
  getTeams(): Promise<TeamInterface[]> {
    return new Promise((resolve) => {
      const teams = localStorage.getItem('teams');
      if (teams) {
        resolve(JSON.parse(teams));
      }
      resolve([]);
    });
  }

  updateTeams(teams: TeamInterface[]) {
    return new Promise((resolve) => {
      localStorage.setItem('teams', JSON.stringify(teams));
      resolve(true);
    });
  }

  getAllData(): Observable<any[]> {
    return this.http.get<any[]>('./assets/data/liderboard.json');
  }
}
