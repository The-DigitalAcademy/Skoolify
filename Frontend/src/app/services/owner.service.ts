import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  private dataSubject = new Subject<any>();
  data$ = this.dataSubject.asObservable();
  setData(data: any) {
    this.dataSubject.next(data);
  }
  constructor() { }
}
