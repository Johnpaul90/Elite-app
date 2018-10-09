import { Http } from '@angular/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import 'rxjs/add/operator/map';
import { of } from 'rxjs/observable/of';


@Injectable()
export class EliteService {
  private baseUrl = 'https://elite-db.firebaseio.com/'
  private currentTourney: any = {}
  private tourneyData = {}
  constructor(public http: Http) {

  }

  getTournaments() {
    return new Promise(resolve => {
      this.http.get(`${this.baseUrl}tournaments.json`).subscribe(x => 
      resolve(x.json()))
    })
  }

  getTournamentData(tourneyId, forRefresh: boolean = false): Observable<any> {

    if (!forRefresh && this.tourneyData[tourneyId]) {
      this.currentTourney = this.tourneyData[tourneyId]
      return of(this.currentTourney);
    }

    return this.http.get(`${this.baseUrl}tournaments-data/${tourneyId}.json`).map(x => {
      this.tourneyData[tourneyId] = x.json();
      this.currentTourney = this.tourneyData[tourneyId];
      return this.currentTourney;
    })
  }

  refreshCurrentTourney() {
    return this.getTournamentData(this.currentTourney.tournament.id, true);
  }

  getCurrentTourney() {
    return this.currentTourney;
  }
}
