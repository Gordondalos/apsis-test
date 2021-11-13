import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { TeamInterface } from '../interfaces/team.interface';
import { UserInterface } from '../interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class TableService {
  constructor(
    private http: HttpClient,
  ) {
  }

  /*
  * This function should return data from the backend
  * return this.http.get(myUrl)
  * */
  getData(type: string): Promise<UserInterface[] | TeamInterface[]> {

    return new Promise((resolve) => {
      const data = localStorage.getItem(type);
      if (data) {
        resolve(JSON.parse(data));
      }
      resolve([]);
    });
  }

  /*
  * work with the backend is therefore done asynchronously
  * return this.http.post(myUrl, data);
  * */
  update(users: UserInterface[] | TeamInterface[], type: string): Promise<any> {
    return new Promise((resolve) => {
      localStorage.setItem(type, JSON.stringify(users));
      resolve(true);
    });
  }


  /*
  This function should return data from the backend
  * return this.http.get(myUrl);
  * */
  getAllData(): Observable<UserInterface[]> {
    const type = 'users';
    const prom: Promise<UserInterface[]> = new Promise((resolve) => {
      const data = localStorage.getItem(type);
      if (data) {
        resolve(JSON.parse(data));
      }
      resolve([]);
    });
    return from(prom);
  }

  getAllData2(){
    return this.http.get<any[]>('./assets/data/liderboard.json');
  }
}
