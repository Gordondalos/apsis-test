import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PersistentService {
  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.log('Error saving to localstorage', e);
    }
  }

  get(key: string): any {
    try {
      const res = localStorage.getItem(key);
      if(res){
        return JSON.parse(res);
      }
      return  undefined
    } catch (e) {
      console.log('Error get from localstorage', e);
    }
  }
}
