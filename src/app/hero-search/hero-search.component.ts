import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent implements OnInit {

  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  // Push a search term into the observable stream
  search(term: string) {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }
}


/*
  A Subject is both a source of observable values and an Observable itself.
  You can subscribe to a Subject as you would any Observable.
  Every time the user types in the textbox, the binding calls search() with
  the textbox value, a "search term". The searchTerms becomes an Observable
  emitting a steady stream of search terms.

  switchMap() calls the search service for each search term that makes it
  through debounce and distinctUntilChanged. It cancels and discards previous
  search observables, returning only the latest search service observable.
  https://angular.io/tutorial/toh-pt6#herosearchcomponent

  switchMap() preserves the original request order while returning only the
  observable from the most recent HTTP method call. Results from prior calls
  are canceled and discarded.
*/
