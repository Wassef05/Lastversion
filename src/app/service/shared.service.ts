import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private headerPositionSource = new Subject<string>();
  headerPosition$ = this.headerPositionSource.asObservable();

  setHeaderPosition(position: string) {
    this.headerPositionSource.next(position);
  }
}
