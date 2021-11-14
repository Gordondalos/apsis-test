import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DynamicInterface } from '../interfaces/dynamic.Interface';

@Injectable({
  providedIn: 'root'
})
export class DynamicService {
  openComponentEvent$ = new Subject<DynamicInterface>();
}
