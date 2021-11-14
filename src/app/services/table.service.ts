import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { TeamInterface } from '../interfaces/team.interface';
import { UserInterface } from '../interfaces/user.interface';
import { after } from 'utils-decorators';


@Injectable({
  providedIn: 'root'
})
export class TableService {
  constructor(
    // private http: HttpClient,
  ) {
  }

  /*
  * This function should return data from the backend
  * return this.http.get(myUrl)
  * */
  @after({
    func: () => {
      console.log('logger getData');
    },
  })
  getData(type: string): Promise<UserInterface[] | TeamInterface[]> {

    return new Promise(resolve => {
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
  *showing work with localstorage
  * */
  @after({
    func: () => {
      console.log('logger update data');
    },
  })
  update(data: UserInterface[] | TeamInterface[], type: string): Promise<any> {
    return new Promise(resolve => {
      localStorage.setItem(type, JSON.stringify(data));
      resolve(true);
    });
  }


  /*
  This function should return data from the backend
  * return this.http.get(myUrl);
   *showing work with localstorage
  * */
  getAllData(): Observable<UserInterface[]> {
    const type = 'users';
    const prom: Promise<UserInterface[]> = new Promise(resolve => {
      const data = localStorage.getItem(type);
      if (data) {
        resolve(JSON.parse(data));
      }
      resolve([]);
    });
    return from(prom);
  }

  errorHandler(e: Error): boolean {
    console.error(e);
    return false
  }
}
