import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import * as _ from 'lodash';
import { EliteService } from '../../providers/elite-service/elite-service';

@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html',
})
export class StandingsPage {

  standings: any[];
  allStandings: any[];
  public divisionFilter = 'division';
  team: any;
  constructor(public navCtrl: NavController,
    private eliteService: EliteService,
    private loadingController: LoadingController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.team = this.navParams.data;
    let tourneyData = this.eliteService.getCurrentTourney();
    this.standings = tourneyData.standings;
    this.filterDivision();
    this.allStandings = tourneyData.standings

    // this.allStandings = _.chain(this.standings).groupBy('division').toPairs().map(Item => _.zipObject(['divisionName', 'divisionStandings'], Item)).value();
  }


  getHeader(record, recordIndex, records) {
    if (recordIndex === 0 || record.division != records[recordIndex - 1].divison) {
      return record.division;
    }
    else {
      return null;
    }
  }

  filterDivision() {
    let loader = this.loadingController.create({
      content: 'Getting teams ...',
      dismissOnPageChange: true
    })
    if (this.divisionFilter === 'all') {

      loader.present().then(() => {
        this.standings = this.allStandings;
      })

    }
    else {
      loader.present().then(() => {
        this.standings = _.filter(this.allStandings, s => s.division === this.team.division);
      })
    }

    loader.dismiss();
  }

}
