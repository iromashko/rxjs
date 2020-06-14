import { fromEvent, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-type-ahead',
  templateUrl: './type-ahead.component.html',
  styleUrls: ['./type-ahead.component.scss'],
})
export class TypeAheadComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const getContinents = (keys) =>
      [
        'africa',
        'antarctica',
        'asia',
        'australia',
        'europe',
        'north america',
        'south america',
      ].filter((e) => e.indexOf(keys.toLowerCase()) > -1);
    const fakeContinentsRequest = (keys) =>
      of(getContinents(keys)).pipe(
        tap((_) => console.log(`API CALL at ${new Date()}`))
      );
    fromEvent(document.getElementById('type-ahead'), 'keyup')
      .pipe(
        debounceTime(200),
        map((e: any) => e.target.value),
        distinctUntilChanged(),
        switchMap(fakeContinentsRequest),
        tap((c) => (document.getElementById('output').innerText = c.join('\n')))
      )
      .subscribe();
  }
}
